hunter_add_package(Arkitekto)
find_package(Arkitekto CONFIG REQUIRED)
if(BUILD_TEST)
    hunter_add_package(GTest)
    find_package(GTest CONFIG REQUIRED)
endif()
# if(WIN32)
#     set(H_CMAKE_MODUE_PATH ${H_CMAKE_MODUE_PATH})
#     unset(CMAKE_MODULE_PATH)
#     find_package(OpenSSL REQUIRED)
#     set(CMAKE_MODULE_PATH ${H_CMAKE_MODUE_PATH})
# else()
#     find_package(OpenSSL CONFIG REQUIRED)
# endif()
hunter_add_package(pixiu)
find_package(pixiu CONFIG REQUIRED)
find_package(Threads REQUIRED)