
Frontend design
===============

比起後端，前端比較多非技術問題要處理
反而是比較棘手的部分......

總之先條列一下短期要達成的目標:

* markdown viewer
* graphviz or plantuml support
* infinite scroll article viewer
* RWD (2 type support)

然後長期希望可以搞定 online article editing 的問題。
這部分可能要處理 online saving 和 platform encoding 的問題
比較複雜暫時先擱置。

另外可以思考一下 websocket 可以做什麼特別的應用
聊天室有點濫俗......

React, 嘴砲
----------

React 從兩三年前就用到現在其實變化不小，但是根本上的問題其實一直都一樣。

所以根據我對 React 系列的 toolchain 理解，我會對其做一定程度的破壞之後設計一個新的基件，然後在那之上開發

Redux, saga 的一些問題 (還是嘴砲)
---------------------------------

當今 React 能提供的東西看來，redux 其實已經沒有存在的必要，而且我認為 redux 和 useContext 這套思維是把問題複雜化了。

如果你允許相依性可以被破壞，資料可以從參數傳遞以外的方式 **teleport** 到另一個 context, 那麼 state 已經可以解決幾乎所有問題

其實這跟把 state 擺到 context 以外的地方是一樣的，你只需要保證讀寫相依性仍然是一致的就可以了。

2020/12/11 by [C.H. Chang](mailto:CHChang810716@gmail.com)
