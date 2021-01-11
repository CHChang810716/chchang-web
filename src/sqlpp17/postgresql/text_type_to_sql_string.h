#include <sqlpp17/value_type_to_sql_string.h>
#include <sqlpp17/data_types.h>
namespace sqlpp::postgresql
{
  struct context_t;
}

namespace sqlpp {

[[nodiscard]] inline auto value_type_to_sql_string(
  ::sqlpp::postgresql::context_t&, 
  type_t<::sqlpp::text>
)
{
  return " TEXT";
}

}