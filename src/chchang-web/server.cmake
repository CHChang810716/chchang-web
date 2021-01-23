include(cmake/scheme/exe.cmake)
target_link_libraries(${AKT_TARGET} PRIVATE
  sqlpp17::sqlpp17
  bcrypt::bcrypt
  PostgreSQL::libpq
)