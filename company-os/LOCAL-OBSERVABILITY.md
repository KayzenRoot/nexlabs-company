# NexLabs Company OS — Local Observability

Status: CANONICAL_WO_017

The optional observability profile contains OpenTelemetry Collector, Prometheus and Grafana.

Future app/worker services emit OTLP over internal Docker networking.

Prometheus scrapes the collector metrics exporter. Grafana provisions Prometheus as the default datasource.

Only Grafana and Prometheus expose loopback ports for developer inspection.

Telemetry must not contain raw credentials, private keys, full secret-bearing prompts or unnecessary personal/customer data.

Prometheus/Grafana volumes are developer continuity data, not canonical Company OS truth.
