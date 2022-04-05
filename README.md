### 需求文档

#### 视图组件

1. ✔️ 推荐页面（首页）

   ✔️header： 左 logo 右 user-icon → 用户中心页

   ✔️tab：推荐、歌手、排行、搜索

   ✔️slider：轮播图 → 活动页

   ✔️main：

   ✔️header 标题

   ✔️scroll：歌单列表 （按需加载、虚拟化列表）→ 专辑详情页

2. 专辑详情页面

   header：

   返回上一页 歌单名

   blur background-image

   :hover btn → 随机播放

   main：

   scroll 歌曲列表，滚动覆盖 blur image → 播放 MiniPlayer，收藏、播放列表等 → Player 详情，圆形进度组件，左滑歌词，底部切换模式，进度条，播放列表/历史

3. 搜索页面

   header：searchInput，防抖处理，只在停止输入时发送请求

   main：scroll 搜索详情/搜索无结果

4. ✔️ 歌手页面

   ✔️main：

   ✔️scroll: singerList -> singerGroup -> 歌手详情

   ✔️index-list: 左边为 singerList 右边为索引列表

5. 歌手详情页面（like 专辑详情页面）

6. 榜单页面

   main：scroll 榜单列表 → 榜单详情页面

7. 榜单详情页面（like 专辑详情页面）

8. 用户中心页面

   header：圆形 avatar，username，user-level，关注，粉丝

   main：收藏歌曲，scroll 收藏歌单 → 专辑详情页面

#### 基础组件

1. Confirm：对话框确认组件
2. ✔️Loading：加载状态组件
3. Message：消息组件
4. NoResult：无结果组件
5. ✔️Scroll：滚动组件（useScroll）
6. SearchList：搜索列表组件
7. ✔️Silder：轮播图组件（useSlider）
8. SongList：歌曲列表组件
9. Switches：导航栏切换组件

#### 业务组件

1. AddSong：添加歌曲组件
2. Header：头组件
3. IndexList：索引列表组件（useFixed/useShortcut）
4. MusicList：歌曲业务组件
5. MiniPlayer：迷你播放器组件
6. Player：播放器组件（useAnimation/useCd/useFavorite/useLyrisc/useMiddleInteractive，useMiniSlider/useMode/usePlayHistory）
7. PlayList：播放列表组件
8. ProgessBar：条形进度组件
9. ProgessCircle：圆形进度组件
10. SearchInput：搜索框组件（usePullupLoad，useSearchHistory）
11. Suggest：搜索推荐组件
12. Tab：导航栏组件
13. WrapScroll：业务滚动组件

#### 后端接口

1. ✔️ 推荐列表
2. 歌曲列表
3. 歌手详情
4. 歌曲 url 获取
5. 歌词
6. 歌单专辑
7. 排行榜
8. 排行榜详情
9. 热门搜索
10. 搜索查询

#### JS 模块

1. array-store：数组类型数据本地存储模块
2. constant：常量存储模块
3. create-detail-component：创建通用详情模块
4. create-loading-like-directive：创建类似 loading 效果的自定义指令模块
5. ✔️dom：DOM 操作辅助模块
6. util：工具库模块

#### 第三方库

✔️vue-router 路由管理，异步路由实现按需加载

vuex 全局状态管理，本地存储

✔️better-scroll 滚动插件

✔️vue3-lazy 图片懒加载插件

good-storage 本地存储插件

lyrics-parser 歌词解析插件

create-keyframe-animation 动态创建 Animation 插件

throttle-debounce 截流防抖插件
