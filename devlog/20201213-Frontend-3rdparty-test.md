
Frontend 3rdparty test
======================

這幾天主要做一些第三方函式庫的行為功能測試。
這一階段主要用到的是:

* [react-markdown](https://github.com/remarkjs/react-markdown)
* [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component)
* [react-responsive](https://github.com/contra/react-responsive)
* [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)
* [axios](https://github.com/axios/axios)

react markdown 做的真的不錯，plugin 的功能大幅增加了這個元件的可能性，但是根據設計也更要小心 injection attack。

infinte scroll 就做的很糟糕了，spec 定得莫名其妙，如果不是更新頻率的考量真的不想用這個元件。
改天可能要花時間重寫這個功能換掉它

RWD 的 best practice 還在研究，其實本來想使用 [react-rwd](https://github.com/jeffreyjw/react-rwd) 這個元件的設計比較接近我的開發思路，然而似乎年久失修不能用了。而且觀察其 commit 狀況, 他可能從來就沒有真正的被大眾使用過。
可惜了蠻好的思路。

react-intersection-observer 也做得很不錯，應該不會有它 cover 不到的應用，如果要改寫 infinite scroll 的話，這應該是最重要的元件。

axios 就沒什麼好討論的了，跟 server 溝通用的。

2020/12/13 by [C.H. Chang](mailto:CHChang810716@gmail.com)