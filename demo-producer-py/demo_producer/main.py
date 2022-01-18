import logging
import os

from demo_producer.config import DemoProducerConfig
from demo_producer.generator import FakeLicenceEventGenerator
from demo_producer.kafka import KafkaEventsProducer


def main():

    config = DemoProducerConfig.from_environment_variables(os.environ)
    logging.basicConfig(level=config.log_level)

    beaches = ["Brighton", "Hastings", "Bexhill"]

    generator = FakeLicenceEventGenerator(beaches)
    producer = KafkaEventsProducer(config.topic, config.producer_config())

    num_events = 10

    for _ in range(0, num_events):
        fake_event = generator.generate()
        producer.send(fake_event)

    producer.flush()


if __name__ == "__main__":
    main()
