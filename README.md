<p align="center">
  <a href="https://www.flaticon.com/" target="blank"><img src="https://cdn-icons-png.flaticon.com/512/3753/3753033.png" width="156" alt="Nest Logo" /></a>
</p>

# Bill Splitter ![build](https://github.com/xXTime-OnXx/bill-splitter/actions/workflows/productive-deployment.yml/badge.svg)

## Description

A project, useful for splitting the bill in a group of people.

## Technologies
<a href="https://skillicons.dev">
  <img src="https://skillicons.dev/icons?i=docker,nginx,firebase,flutter,angular,nestjs,postgres"  alt=""/>
</a>

## Feature List

- :white_check_mark: Login & Register
- :white_check_mark: [#6 User Profile](https://github.com/xXTime-OnXx/bill-splitter/issues/6)
- :hourglass_flowing_sand: [#17 Group / Trip](https://github.com/xXTime-OnXx/bill-splitter/issues/17)
- :large_blue_circle: [#16 Create Bill Manually](https://github.com/xXTime-OnXx/bill-splitter/issues/16)
- :large_blue_circle: [#19 Create Bill Automatically (AI)](https://github.com/xXTime-OnXx/bill-splitter/issues/19)
- :large_blue_circle: Demo video with modern Advertisement tool (e.g. [Rotato](https://rotato.app/))

## Technical Debts

- :white_check_mark: [Migrate NestJs to v9](https://docs.nestjs.com/migration-guide)
- :large_blue_circle: Create a kubernetes cluster with [Minikube](https://minikube.sigs.k8s.io/docs/) for DEV & PRD
  deployment
- :large_blue_circle: Implement current Ionic/Angular Frontend with [Flutter](https://flutter.dev/)

## Lets-encrypt Certbot

An automatic certificate renewal is implemented in the `docker-compose.yaml`
which should check every 12 hours if the certificate is expired.

Manual certificate renewal:

```shell
docker-compose run --rm certbot renew
```

## Credits

- <a href="https://www.flaticon.com/authors/freepik" title="Freepik Icons">Icons created by Freepik - Flaticon</a>
