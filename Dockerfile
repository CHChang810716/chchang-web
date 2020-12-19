FROM celiangarcia/gcc7-cmake:3.13.5

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt update && \
    apt install -y yarn && \
    cd chchang-web-ui && \
    yarn install && \
    export REACT_APP_PORT=$PORT \
    yarn build && \
    cd .. && \
    mkdir build && cd build && \
    cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=../stage -DBUILD_TEST=OFF && \
    cmake --build . --target install && \
    cd ..

CMD stage/bin/chchang-web-server $PORT