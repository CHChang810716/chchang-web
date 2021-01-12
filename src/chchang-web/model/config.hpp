#pragma once
#include <functional>
#include <sqlpp17/postgresql/connection_config.h>
#include <sqlpp17/postgresql/connection.h>
#include <iostream>
namespace chchang_web::model
{

constexpr auto get_db_config = []() -> ::sqlpp::postgresql::connection_config_t
{
  auto config = ::sqlpp::postgresql::connection_config_t{};
  config.dbname   = "testdb"  ;
  config.host     = "localhost"  ;
  config.user     = "johnidfet"  ;
  config.password = "qsefthuk90"  ;
  try
  {
    auto db = ::sqlpp::postgresql::connection_t<::sqlpp::debug::allowed>{config};
  }
  catch (const sqlpp::exception& e)
  {
    std::cerr << "For testing, you'll need to create a database " << *config.dbname << " for user root (no password)"
              << std::endl;
    throw;
  }
  return config;
};
    
}
