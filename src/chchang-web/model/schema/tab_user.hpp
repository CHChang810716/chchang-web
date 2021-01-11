#pragma once
#include <string_view>

#include <sqlpp17/data_types.h>
#include <sqlpp17/name_tag.h>
#include <sqlpp17/table.h>

namespace chchang_web::model::schema {

struct TabUser : public ::sqlpp::spec_base
{
  SQLPP_NAME_TAGS_FOR_SQL_AND_CPP(TabUser, tabUser);

  struct Id : public ::sqlpp::spec_base
  {
    SQLPP_NAME_TAGS_FOR_SQL_AND_CPP(id, id);
    using value_type = std::int64_t;
    static constexpr auto can_be_null = false;
    static constexpr auto has_default_value = false;
    static constexpr auto has_auto_increment = true;
  };

  struct Email : public ::sqlpp::spec_base
  {
    SQLPP_NAME_TAGS_FOR_SQL_AND_CPP(email, email);
    using value_type = ::sqlpp::varchar<255>;
    static constexpr auto can_be_null = false;
    static constexpr auto has_default_value = false;
    static constexpr auto has_auto_increment = false;
  };

  struct Password : public ::sqlpp::spec_base
  {
    SQLPP_NAME_TAGS_FOR_SQL_AND_CPP(password, password);
    using value_type = ::sqlpp::text;
    static constexpr auto can_be_null = false;
    static constexpr auto has_default_value = false;
    static constexpr auto has_auto_increment = false;
  };

  using _columns = ::sqlpp::type_vector<Id, Email, Password>;

  using primary_key = sqlpp::type_vector<Id>;
};
constexpr auto tabUser = sqlpp::table_t<TabUser>{};

}