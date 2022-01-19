FROM python:3.10-slim-bullseye as BUILD

ARG PACKAGE

COPY dist/$PACKAGE /tmp/

RUN apt-get update && apt-get install -y \
    librdkafka-dev \
    gcc

RUN python -m venv /tmp/venv && /tmp/venv/bin/pip install /tmp/$PACKAGE

FROM python:3.10-slim-bullseye 
COPY --from=BUILD /tmp/venv /opt/venv

RUN apt-get update && apt-get install -y librdkafka1 \
  && rm -rf /var/lib/apt/lists/*

RUN groupadd -g 1000 producer && useradd -r -u 1000 -l -g producer producer
USER producer

ENTRYPOINT ["/opt/venv/bin/python", "-m", "demo_producer.main"]

