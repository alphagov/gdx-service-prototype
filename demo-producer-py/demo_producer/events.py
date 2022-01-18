from dataclasses import dataclass
from datetime import date
from json import dumps


def _format_date(d):
    return d.strftime("%Y-%m-%d")


@dataclass
class BeachBallLicenceGrantedEvent:
    licence_id: str
    valid_from: date
    valid_to: date
    beach: str

    def as_json(self):
        return dumps(
            {
                "licenceId": self.licence_id,
                "validFrom": _format_date(self.valid_from),
                "validTo": _format_date(self.valid_to),
                "beach": self.beach,
            }
        )
