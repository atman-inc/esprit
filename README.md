# esprit

espritはTypeScriptによるAPIサーバの開発をサポートするCLIツールです。

## Installation

Install by npm

```
npm install -g esprit
```

# Command

## new

新規にプロジェクトを作成します。

```
esprit new <name>
```

espritは下記の3つのProjectTemplateを用意しており、基本構成はCleanArchitectureに従っています。

1. REST API
1. gRPC
1. GraphQL

例: REST APIの場合
```
.
├── Dockerfile
├── config
│   ├── default.yml
│   ├── development.yml
│   └── test.yml
├── esprit.config.json
├── index.ts
├── jest.config.js
├── jest.setup.ts
├── lib
│   ├── application
│   │   ├── interactors
│   │   └── usecases
│   ├── domain
│   │   ├── entities
│   │   └── repositories
│   ├── infrastructure
│   │   ├── di.ts
│   │   └── webserver
│   └── interface
│       └── controllers
├── package-lock.json
├── package.json
└── tsconfig.json
```

### REST API

REST APIは下記に依存しています。

- fastify
- fastify-openapi-glue

## add

espritで作成したprojectにライブラリなどを追加します。

### database

```
esprit add database
```

databaseは下記から選ぶことができ、選択に応じてORMもInstallされます。

1. PostgreSQL
1. MySQL
1. Firestore Datastore
1. and more...

#### ORM

1. PostgreSQL
1. MySQL

上記を選択した場合は、TypeORMがInstallされます。

TypeORMがInstallされると、ProjectRootに`ormconfig.ts`が生成されます。  
このファイルにDatabaseへの接続情報などを設定します。

REF: https://typeorm.io/#/using-ormconfig/using-ormconfigjs

1. Firestore Datastore

上記を選択した場合は、ORMは使用せずGoogleの公式SDKがInstallされます。

## generate

### usecase

```
esprit generate usecase <name>
```

usecaseを生成します。

```
lib/application/interactors/<name>Interactor.ts
lib/application/usecases/<name>Usecase.ts
spec/application/interactors/<name>Interactor.spec.ts
```

usecaseはInterfaceとして生成され、Usecaseの実装を担保するInteractorファイルも生成されます。

### entity

```
esprit generate entity <name>
```

entityを生成します。

```
lib/domain/entities/<name>.ts
spec/domain/entities/<name>.spec.ts
```

domain層にEntity Classを定義したファイルを生成します。

`add database`が実行されており、ORMが存在する場合は、ORM用のEntityも同時に生成されます。

```
lib/infrastructure/orm/entities/<name>.ts
spec/infrastructure/orm/entities/<name>.spec.ts
```

### repository

```
esprit generate repository <name>
```

repositoryを生成します。

```
lib/domain/repositories/UserRepository.ts
lib/infrastructure/repositories/UserRepository.ts
spec/infrastructure/repositories/UserRepository.spec.ts
```

domain層に、RepositoryのInterfaceが定義され、そのInterfaceをimplementsしたclassをinfra層に生成します。
infra層に生成されるリポジトリは、ORMに依存するかたちで生成されます。

例）TypeORMの場合
```typescript
import { EntityRepository, EntityManager } from "typeorm";
import { User } from "lib/infrastructure/orm/entities/User";
import { User as DomainUser } from "lib/domain/entities/User";
import { UserRepository as IUserRepository } from "lib/domain/repositories/UserRepository";

@EntityRepository()
export class UserRepository implements IUserRepository {
  constructor(private manager: EntityManager) {}
}
```

### controller

```
esprit generate controller <name>
```

controllerを生成します。

```
lib/interface/controllers/<name>Controller.ts
spec/interface/controllers/<name>Controller.spec.ts
```

## migration

ORMがTypeORMの場合のみ、`migration`コマンドを実行できるようになります。

TypeORMのMigrationはEntityクラスをもとに自動でMigrationファイルを出力してくれます。  
（espritではEntityとTableのSyncronized機能はOFFにしています）

REF: https://typeorm.io/#/migrations

### generate

```
esprit migration generate <name>
```

Entity情報とTableの差分を抽出し、Migrationファイルを生成します。

### create

```
esprit migration create <name>
```

generateとは異なり、素のMigrationファイルを生成します。

### run

```
esprit migration run
```

migrationを実行します。

### revert

```
esprit migration revert
```

migrationを一つ戻します。

## openapi

Project作成時、REST APIを選択した場合のみ、`openapi`コマンドを実行できるようになります。

### update

```
esprit openapi update
```

espritのREST APIプロジェクトは、OpenAPIを利用しSchema firstの構成になっています。

`fastify-openapi-glue`を利用し、OpenAPIのjsonから自動でfastifyのroutingをセットし、`operationId`に紐付いたhandlerが実行されます。

REF: https://github.com/seriousme/fastify-openapi-glue

handlerの処理は、`lib/infrastructure/webserver/service.ts`で管理されています。

このコマンドでは、TypeScriptの型システムとhandlerの処理を紐付けるために下記のアクションが実行されます。

1. dtsgenerator(https://github.com/horiuchi/dtsgenerator)により、OpenAPIのjsonを基に型定義ファイルを生成
1. OpenAPIのjsonを基に、`service.ts`にhandlerの雛形を生成

# Config

espritコマンドは、`esprit.config.json`によって挙動を制御しています。

## esprit.config.json

```json
{
  "name": "PROJECT_NAME",
  "mode": "REST",
  "openAPI": {
    "jsonFilePath": "lib/infrastructure/webserver/swagger.bundle.json",
    "service": "lib/infrastructure/webserver/service"
  },
  "database": {
    "type": "postgres",
    "orm": "typeorm"
  }
}
```

### name
　
`esprit new`で作成したProject名。

### mode

`esprit new`の際に選択したAPIの種類。

- REST
- gRPC
- GraphQL

### openAPI

`mode`が`REST`のときだけ追加される設定。  
OpenAPIのjsonファイルまでのパスと、handlerを管理しているserviceクラスへのパスを管理します。

### database

`esprit add database`の際に選択したdatabaseと、それに紐付いたORMの種類を管理します。
