const axios = require("axios");
// 获取签名方法
const getSecuritySign = require("./sign");
const pinyin = require("pinyin");

const ERR_OK = 0;
const token = 5381;

// 公共参数
const commonParams = {
  g_tk: token,
  loginUin: 0,
  hostUin: 0,
  inCharset: "utf8",
  outCharset: "utf-8",
  notice: 0,
  needNewCode: 0,
  format: "json",
  platform: "yqq.json",
};

// 获取一个随机数值
function getRandomVal(prefix = "") {
  return prefix + (Math.random() + "").replace("0.", "");
}

// 对 axios get 请求的封装
// 修改请求的 headers 值，合并公共请求参数
function get(url, params) {
  return axios.get(url, {
    headers: {
      referer: "https://y.qq.com/",
      origin: "https://y.qq.com/",
    },
    params: Object.assign({}, commonParams, params),
  });
}

// 注册后端路由
function registerRouter(app) {
  registerRecommend(app);
  registerSingeList(app);
}

function registerRecommend(app) {
  app.get("/api/getRecommend", (req, res) => {
    // 第三方服务接口 url
    const url = "https://u.y.qq.com/cgi-bin/musics.fcg";

    // 构造请求参数 data
    const data = JSON.stringify({
      comm: { ct: 24 },
      recomPlaylist: {
        method: "get_hot_recommend",
        param: { async: 1, cmd: 2 },
        module: "playlist.HotRecommendServer",
      },
      focus: {
        module: "music.musicHall.MusicHallPlatform",
        method: "GetFocus",
        param: {},
      },
    });

    // 随机数值
    const randomVal = getRandomVal("recom");
    // 计算签名值
    const sign = getSecuritySign(data);

    // 发送 get 请求
    get(url, {
      sign,
      "-": randomVal,
      data,
    }).then((response) => {
      const data = response.data;
      if (data.code === ERR_OK) {
        // 处理轮播图数据
        const focusList = data.focus.data.shelf.v_niche[0].v_card;
        const sliders = [];
        const jumpPrefixMap = {
          10002: "https://y.qq.com/n/yqq/album/",
          10014: "https://y.qq.com/n/yqq/playlist/",
          10012: "https://y.qq.com/n/yqq/mv/v/",
        };
        // 最多获取 10 条数据
        const len = Math.min(focusList.length, 10);
        for (let i = 0; i < len; i++) {
          const item = focusList[i];
          const sliderItem = {};
          // 单个轮播图数据包括 id、pic、link 等字段
          sliderItem.id = item.id;
          sliderItem.pic = item.cover;
          if (jumpPrefixMap[item.jumptype]) {
            sliderItem.link =
              jumpPrefixMap[item.jumptype] + (item.subid || item.id) + ".html";
          } else if (item.jumptype === 3001) {
            sliderItem.link = item.id;
          }
          sliders.push(sliderItem);
        }

        // 处理歌单数据
        const albumList = data.recomPlaylist.data.v_hot;
        const albums = [];
        for (let i = 0; i < albumList.length; i++) {
          const item = albumList[i];
          const albumItem = {};
          // 推荐歌单数据包括 id、username、title、pic 等字段
          albumItem.id = item.content_id;
          albumItem.username = item.username;
          albumItem.title = item.title;
          albumItem.pic = item.cover;

          albums.push(albumItem);
        }

        // 往前端发送一个标准格式的响应数据，包括成功错误码和数据
        res.json({
          code: ERR_OK,
          result: {
            sliders,
            albums,
          },
        });
      } else {
        res.json(data);
      }
    });
  });
}

function registerSingeList(app) {
  app.get("/api/getSingerList", (req, res) => {
    const url = "https://u.y.qq.com/cgi-bin/musics.fcg";
    const HOT_NAME = "热";

    const data = JSON.stringify({
      comm: { ct: 24, cv: 0 },
      singerList: {
        module: "Music.SingerListServer",
        method: "get_singer_list",
        param: {
          area: -100,
          sex: -100,
          genre: -100,
          index: -100,
          sin: 0,
          cur_page: 1,
        },
      },
    });
    const randomKey = getRandomVal("getUCGI");
    const sign = getSecuritySign(data);

    get(url, {
      sign,
      "-": randomKey,
      data,
    }).then((response) => {
      const data = response.data;
      if (data.code === ERR_OK) {
        // 处理歌手数据
        const singerList = data.singerList.data.singerlist;
        // 构造歌手列表数据
        const singerMap = {
          hot: {
            title: HOT_NAME,
            list: map(singerList.slice(0, 10)),
          },
        };

        singerList.forEach((item) => {
          const p = pinyin(item.singer_name);
          if (!p || !p.length) {
            return;
          }
          // 获取歌手名拼音的首字母
          const key = p[0][0].slice(0, 1).toUpperCase();
          if (key) {
            if (!singerMap[key]) {
              singerMap[key] = {
                title: key,
                list: [],
              };
            }
            // 每个字母下面会有很多歌手
            singerMap[key].list.push(map([item])[0]);
          }
        });
        // 热门歌手
        const hot = [];
        // 字母歌手
        const letter = [];

        // 遍历处理 SingerMap，让结果有序
        for (const key in singerMap) {
          const item = singerMap[key];
          if (item.title.match(/[a-zA-Z]/)) {
            letter.push(item);
          } else if (item.title === HOT_NAME) {
            hot.push(item);
          }
        }
        letter.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
        res.json({
          code: ERR_OK,
          result: {
            singers: hot.concat(letter),
          },
        });
      } else {
        res.json(data);
      }
    });
  });
}

function map(singerList) {
  return singerList.map((item) => {
    return {
      id: item.singer_id,
      mid: item.singer_mid,
      name: item.singer_name,
      pic: item.singer_pic
        .replace(/\.webp$/, ".jpg")
        .replace("150x150", "800x800"),
    };
  });
}

module.exports = registerRouter;
