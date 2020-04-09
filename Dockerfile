FROM ruby:2.5.7

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
RUN echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list

RUN apt-get update
RUN apt-get install -y \ 
  build-essential \ 
  nodejs \
  postgresql-client \
  unzip xvfb libxi6 libgconf-2-4 \
  google-chrome-stable \
  git-flow \
  libmagic-dev \
  vim

RUN ln -sf /usr/bin/nodejs /usr/local/bin/node
RUN npm install -g yarn

ENV EDITOR=vim
ENV BUNDLE_PATH=/bundle
ENV BUNDLE_BIN=/bundle/bin
ENV GEM_HOME=/bundle
ENV PATH="${BUNDLE_BIN}:${PATH}"

EXPOSE 3000
EXPOSE 3035
EXPOSE 35729

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN groupadd -g 1000 app
RUN groupadd -g 999 docker
RUN useradd -m -u 1000 -g 999 -s /bin/bash app

COPY . ./

COPY entrypoint.sh /usr/bin
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

USER app
CMD ["bash"]