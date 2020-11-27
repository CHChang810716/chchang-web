FROM celiangarcia/gcc7-cmake:3.13.5

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN mkdir build && cd build && \
    cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=../stage -DBUILD_TEST=OFF && \
    cmake --build . --target install && \
    cd ..

CMD echo $PORT