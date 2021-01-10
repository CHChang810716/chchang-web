hunter_config(Boost VERSION "1.69.0-p0")
hunter_config(sqlpp17 VERSION ${HUNTER_sqlpp17_VERSION}
    CMAKE_ARGS
        USE_PGSQL=ON
)
hunter_config(PostgreSQL VERSION ${HUNTER_PostgreSQL_VERSION}
    CMAKE_ARGS
        EXTRA_FLAGS=--with-openssl
)