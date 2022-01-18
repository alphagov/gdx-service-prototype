import logging

from confluent_kafka import Producer

log = logging.getLogger(__name__)


def _log_delivery_report(error, message):
    if error is None:
        log.info(f"Delivered to topic: {message.topic()} ({message.partition()})")
    else:
        log.error(f"Failed to deliver message: {error}")


class KafkaEventsProducer:
    def __init__(self, topic, config):
        self._topic = topic
        self._producer = Producer(config)

    def send(self, event):
        self._producer.produce(
            self._topic,
            event.as_json().encode("utf-8"),
            callback=_log_delivery_report,
        )

    def flush(self):
        self._producer.flush()
