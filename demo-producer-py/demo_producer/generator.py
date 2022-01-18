from datetime import date, timedelta
from random import choice, randint
from string import ascii_lowercase

from demo_producer.events import BeachBallLicenceGrantedEvent


def _random_prefix(length=6):
    return "".join(choice(ascii_lowercase) for _ in range(length))


def _random_date():
    return date(
        year=randint(2000, 2100),
        month=randint(1, 12),
        day=randint(1, 28),
    )


def _random_days():
    return timedelta(days=randint(10, 90))


class FakeLicenceEventGenerator:
    def __init__(self, beaches):
        self._beaches = beaches
        self._event_count = 0

    def _next_number(self):
        self._event_count += 1
        return self._event_count

    def generate(self):
        num = self._next_number()
        prefix = _random_prefix()
        start_date = _random_date()
        end_date = start_date + _random_days()
        return BeachBallLicenceGrantedEvent(
            licence_id=f"{prefix}_{num}",
            valid_from=start_date,
            valid_to=end_date,
            beach=choice(self._beaches),
        )
