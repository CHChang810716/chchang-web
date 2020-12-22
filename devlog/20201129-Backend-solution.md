
Backend solution
================

Pixiu status
------------

上一次 commit Pixiu project 大概是一年多前的事，regression 要修、功能 spec 要整理

Current available feature:

* plain HTTP protocol
* HTTP pipeline support
* broken HTTPS
* buggy session behavior

IT issue
--------

* Heroku requires docker to deploy the C++ web site
* Heroku uses their own YML file to config the build, needs to learn.
* Heroku database uses pgSQL, a management tool is required

DB issue
--------

* pgSQL C++ ORM library?

Current task queue
------------------

* Pixiu library fix
  * support SSL
  * bugfix
* Heroku docker config survey
* pgSQL ORM library survey

2020/11/29 by [C.H. Chang](CHChang810716@gmail.com)
