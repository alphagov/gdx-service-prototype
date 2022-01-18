import sys
from dataclasses import dataclass


class EnvironmentVariableReader:
    def __init__(self, env_vars, prefix):
        self._prefix = prefix
        self._env_vars = env_vars

    def read(self, variable_name, default=None):
        env_var = self._prefix + variable_name
        try:
            return self._env_vars[env_var]
        except KeyError:
            if default is not None:
                return default
            else:
                sys.stderr.write(f"Required environment variable {env_var} not set, exiting...\n")
                sys.exit(1)


@dataclass
class DemoProducerConfig:
    bootstrap_servers: str
    topic: str
    message_max_bytes: int
    log_level: str

    @classmethod
    def from_environment_variables(cls, env_vars):
        env = EnvironmentVariableReader(env_vars, prefix="KDEMO_")
        return cls(
            bootstrap_servers=env.read("BOOTSTRAP_SERVERS"),
            topic=env.read("TOPIC"),
            message_max_bytes=int(env.read("MESSAGE_MAX_BYTES", default="1000")),
            log_level=env.read("LOG_LEVEL", default="INFO").upper(),
        )

    def producer_config(self):
        return {
            "bootstrap.servers": self.bootstrap_servers,
            "message.max.bytes": self.message_max_bytes,
        }
