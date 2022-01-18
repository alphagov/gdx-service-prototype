from datetime import date
from json import dumps

from demo_producer.events import BeachBallLicenceGrantedEvent


def test_licence_event_is_correctly_serialized_to_json():
    event = BeachBallLicenceGrantedEvent(
        licence_id="abc",
        valid_from=date(2022, 1, 2),
        valid_to=date(2022, 1, 9),
        beach="Margate",
    )

    expected = dumps(
        {"licenceId": "abc", "validFrom": "2022-01-02", "validTo": "2022-01-09", "beach": "Margate"}
    )

    actual = event.as_json()

    assert actual == expected
