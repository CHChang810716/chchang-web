cmake_minimum_required(VERSION 3.10.0)
include(cmake/HunterGate.cmake)
set(
    HUNTER_CACHE_SERVERS
    "https://github.com/CHChang810716/hunter-binary-cache"
    CACHE
    STRING
    "Hunter cache servers"
)
HunterGate(
    URL "https://github.com/CHChang810716/hunter.git"
    SHA1 62eee92093b4cd36e80ca033689d4abb7e2def32
    FILEPATH ${CMAKE_CURRENT_LIST_DIR}/cmake/hunter_config.cmake
)

project(CHChangWeb
    LANGUAGES C CXX 
    VERSION 0.1.0.0
)
option(BUILD_TEST   "Build project with test"   OFF)
option(INSTALL_DEPS "Install dependensies"      OFF)

include(cmake/toolchain_conf.cmake)
include(cmake/packages.cmake)
include(cmake/src.cmake)
include(cmake/ide.cmake)
include(cmake/install.cmake)
