# VK TASK

Было принято решение использовать библиотеку Ant Design для отображения элементов, т.к. удобно, практично и красиво. Сайт считывает репозитории с api гитхаба по запросу: "https://api.github.com/search/repositories?q=clojure&sort=stars&order=asc&page=${page}", таким образом парсит данные о репозиториях, каким-либо образом упоминающшим небезызвестный язык Clojure.

Отображены только некоторые, основные характеристики репозитория, чтобы не нагромождать сайт и получать только самую важную информацию о репозитории. Добавлена возможность сортировать список по полям репозитория и локально изменять, удалять репозитории. Как и просят в задании.

Вы можете посмотреть, как отображается сайт, по ссылке в правом верхнем углу этого репозитория.
