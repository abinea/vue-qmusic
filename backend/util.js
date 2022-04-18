const axios = require("axios")

const token = 5381

const ERR_OK = 0

// 歌曲图片加载失败时使用的默认图片
const fallbackPicUrl =
  "https://y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000"

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
}

// 对 axios get 请求的封装
// 修改请求的 headers 值，合并公共请求参数
function get(url, params, header = { origin: "https://y.qq.com/" }) {
  return axios.get(url, {
    headers: {
      referer: "https://y.qq.com/",
      ...header,
    },
    params: Object.assign({}, commonParams, params),
  })
}

// 对 axios post 请求的封装
// 修改请求的 headers 值
function post(url, params) {
  return axios.post(url, params, {
    headers: {
      referer: "https://y.qq.com/",
      origin: "https://y.qq.com/",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
}

// 获取一个随机数值
function getRandomVal(prefix = "") {
  return prefix + (Math.random() + "").replace("0.", "")
}

// 获取一个随机uid
function getUid() {
  const t = new Date().getUTCMilliseconds()
  return "" + ((Math.round(2147483647 * Math.random()) * t) % 1e10)
}

// 处理歌曲列表
function handleSongList(list) {
  const songList = []

  list.forEach((item) => {
    const info = item.songInfo || item
    if (info.pay.pay_play !== 0 || !info.interval) {
      // 过滤付费歌曲和获取不到时长的歌曲
      return
    }

    // 构造歌曲的数据结构
    const song = {
      id: info.id,
      mid: info.mid,
      name: info.name,
      singer: mergeSinger(info.singer),
      url: "", // 在另一个接口获取
      duration: info.interval,
      pic: info.album.mid
        ? `https://y.gtimg.cn/music/photo_new/T002R800x800M000${info.album.mid}.jpg?max_age=2592000`
        : fallbackPicUrl,
      album: info.album.name,
    }

    songList.push(song)
  })

  return songList
}

// 合并多个歌手的姓名
function mergeSinger(singer) {
  const ret = []
  if (!singer) {
    return ""
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join("/")
}

module.exports = {
  token,
  ERR_OK,
  fallbackPicUrl,
  get,
  post,
  getRandomVal,
  getUid,
  handleSongList,
  mergeSinger,
}
