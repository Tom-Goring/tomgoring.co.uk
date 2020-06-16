# www.tomgoring.co.uk

My personal website: frontend written with React with JS (with a plan to switch over to typescript eventually), backend written in Rust with actix-web and a Postgresql DB.

Deployed with a self-hosted CI/CD pipeline using drone.io and a kubernetes cluster. Pushes to the Git repository trigger a webhook to the drone server on build.tomgoring.co.uk, where an image is built and pushed to a self-hosted docker registry using [kaniko](https://github.com/GoogleContainerTools/kaniko).

## Current TODOs

- [x] Set up SSL, domains, and ingress.
- [x] Finish setting up CI/CD pipeline.
  - [x] API
  - [x] Client
- [ ] Connect frontend to backend properly
- [ ] Add auth routes to backend.
- [ ] Add actual frontend code.
  - [ ] Add cron/service that fetches a daily background for home page.
  - [ ] Work in future auth routes so only I can edit and add todos, but anybody can look at 'public' ones.
  - [ ] Rework theme with some different colours?
