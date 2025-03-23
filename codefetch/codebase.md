Project Structure:
├── CHANGELOG.md
├── LICENSE
├── README.md
├── codefetch
│   └── codebase.md
├── docs
│   ├── next-env.d.ts
│   ├── next-sitemap.config.js
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── svgr.d.ts
│   ├── tailwind.config.js
│   ├── theme.config.jsx
│   ├── tsconfig.build.json
│   ├── tsconfig.json
├── eslint.config.mjs
├── examples
│   ├── tsconfig.build.json
│   └── tsconfig.json
├── package.json
├── packages
│   ├── tsconfig.build.json
│   └── tsconfig.json
├── pnpm-lock.yaml
├── renovate.json
├── src
└── yarn.lock


packages/tsconfig.build.json
```
1 | {
2 |   "compilerOptions": {
3 |     "module": "commonjs",
4 |     "declaration": true,
5 |     "incremental": false,
6 |     "declarationMap": true,
7 |     "noImplicitAny": false,
8 |     "importHelpers": true,
9 |     "esModuleInterop": true,
10 |     "removeComments": false,
11 |     "noLib": false,
12 |     "forceConsistentCasingInFileNames": true,
13 |     "emitDecoratorMetadata": true,
14 |     "experimentalDecorators": true,
15 |     "target": "ES2021",
16 |     "sourceMap": true,
17 |     "skipLibCheck": true,
18 |     "resolveJsonModule": true,
19 |     "strict": true
20 |   }
21 | }
```

packages/tsconfig.json
```
1 | {
2 |   "files": [],
3 |   "references": [
4 |     {
5 |       "path": "./nestjs-trpc/tsconfig.build.json"
6 |     }
7 |   ]
8 | }
```

packages/nestjs-trpc/jest.config.js
```
1 | module.exports = {
2 |     preset: 'ts-jest',
3 |     testEnvironment: 'node',
4 |     roots: ['<rootDir>/lib'],
5 |     testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
6 |     transform: {
7 |       '^.+\\.tsx?$': ['ts-jest', {
8 |         tsconfig: 'tsconfig.spec.json',
9 |         diagnostics: {
10 |           ignoreCodes: [151001]
11 |         }
12 |       }]
13 |     },
14 |     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
15 |   };
```

packages/nestjs-trpc/package.json
```
1 | {
2 |   "name": "nestjs-trpc",
3 |   "version": "1.6.1",
4 |   "homepage": "https://nestjs-trpc.io",
5 |   "main": "./dist/index.js",
6 |   "types": "./dist/index.d.ts",
7 |   "license": "MIT",
8 |   "files": [
9 |     "dist"
10 |   ],
11 |   "exports": {
12 |     ".": {
13 |       "import": "./dist/index.js",
14 |       "require": "./dist/index.js",
15 |       "types": "./dist/index.d.ts"
16 |     }
17 |   },
18 |   "scripts": {
19 |     "build": "rm -rf dist && tsc --project tsconfig.build.json",
20 |     "start:dev": "tsc --project tsconfig.json --watch --preserveWatchOutput",
21 |     "debug:dev": "ts-node --inspect-brk lib/index.ts",
22 |     "clean": "tsc -b --clean",
23 |     "test": "TS_JEST_DISABLE_VER_CHECKER=true jest --no-watchman --coverage"
24 |   },
25 |   "keywords": [
26 |     "nestjs",
27 |     "trpc",
28 |     "adapter",
29 |     "nest",
30 |     "express",
31 |     "fastify",
32 |     "api",
33 |     "typescript",
34 |     "types"
35 |   ],
36 |   "author": {
37 |     "name": "Kevin Edry",
38 |     "email": "kevin.edry@gmail.com",
39 |     "url": "https://kevin-edry.com"
40 |   },
41 |   "publishConfig": {
42 |     "access": "public",
43 |     "registry": "https://registry.npmjs.org"
44 |   },
45 |   "peerDependencies": {
46 |     "@nestjs/common": "^9.3.8 || ^10.0.0",
47 |     "@nestjs/core": "^9.3.8 || ^10.0.0",
48 |     "@trpc/server": "^10.0.0",
49 |     "reflect-metadata": "^0.1.13 || ^0.2.0",
50 |     "rxjs": "7.8.1",
51 |     "zod": "^3.14.0"
52 |   },
53 |   "devDependencies": {
54 |     "@nestjs/common": "10.4.1",
55 |     "@nestjs/core": "10.4.1",
56 |     "@nestjs/testing": "10.4.1",
57 |     "@trpc/server": "^10.18.0",
58 |     "@types/express": "^4.17.17",
59 |     "@types/jest": "^29.5.12",
60 |     "@types/lodash": "^4.17.5",
61 |     "@types/node": "^22.5.0",
62 |     "fastify": "^5.0.0",
63 |     "jest": "^29.7.0",
64 |     "reflect-metadata": "0.1.13",
65 |     "rxjs": "7.8.1",
66 |     "ts-jest": "^29.2.5",
67 |     "ts-node": "10.9.2",
68 |     "tsconfig-paths": "^4.2.0",
69 |     "type-fest": "^4.21.0",
70 |     "typescript": "5.5.3",
71 |     "zod": "^3.14.4"
72 |   },
73 |   "dependencies": {
74 |     "lodash": "^4.17.21",
75 |     "ts-morph": "22.0.0",
76 |     "tslib": "^2.5.0"
77 |   },
78 |   "repository": {
79 |     "type": "git",
80 |     "url": "https://github.com/KevinEdry/nestjs-trpc",
81 |     "directory": "packages/nestjs-trpc"
82 |   }
83 | }
```

packages/nestjs-trpc/tsconfig.build.json
```
1 | {
2 |   "extends": "../tsconfig.build.json",
3 |   "compilerOptions": {
4 |     "outDir": "./dist",
5 |     "rootDir": "./lib",
6 |     "incremental": false,
7 |     "experimentalDecorators": true
8 |   },
9 |   "include": ["lib/**/*.ts"],
10 |   "exclude": ["node_modules", "dist", "lib/**/__tests__/*", "*.spec.ts"]
11 | }
```

packages/nestjs-trpc/tsconfig.json
```
1 | {
2 |   "extends": "../tsconfig.build.json",
3 |   "compilerOptions": {
4 |     "types": ["node"],
5 |     "experimentalDecorators": true
6 |   },
7 |   "files": [],
8 |   "include": [],
9 |   "references": [
10 |     {
11 |       "path": "./tsconfig.build.json"
12 |     },
13 |     {
14 |       "path": "./tsconfig.spec.json"
15 |     }
16 |   ]
17 | }
```

packages/nestjs-trpc/tsconfig.spec.json
```
1 | {
2 |   "extends": "./tsconfig.json",
3 |   "compilerOptions": {
4 |     "experimentalDecorators": true,
5 |     "sourceMap": true,
6 |     "outDir": "./dist/tests",
7 |     "types": ["jest", "node"],
8 |     "emitDecoratorMetadata": true
9 |   }
10 | }
```

packages/nestjs-trpc/lib/app-router.host.ts
```
1 | import { Injectable } from '@nestjs/common';
2 | import { AnyRouter } from '@trpc/server';
3 | 
4 | @Injectable()
5 | export class AppRouterHost {
6 |   private _appRouter: AnyRouter | undefined;
7 | 
8 |   set appRouter(schemaRef: AnyRouter) {
9 |     this._appRouter = schemaRef;
10 |   }
11 | 
12 |   get appRouter(): AnyRouter {
13 |     if (!this._appRouter) {
14 |       throw new Error(
15 |         'TRPC appRouter has not yet been created. ' +
16 |           'Make sure to call the "AppRouterHost#appRouter" getter when the application is already initialized (after the "onModuleInit" hook triggered by either "app.listen()" or "app.init()" method).',
17 |       );
18 |     }
19 |     return this._appRouter;
20 |   }
21 | }
```

packages/nestjs-trpc/lib/index.ts
```
1 | export * from './trpc.module';
2 | export * from './interfaces';
3 | export * from './decorators';
4 | export * from './app-router.host';
```

packages/nestjs-trpc/lib/trpc.constants.ts
```
1 | export const TRPC_MODULE_OPTIONS = 'TrpcModuleOptions';
2 | 
3 | export const TRPC_GENERATOR_OPTIONS = 'TrpcGenderOptions';
4 | export const TRPC_MODULE_CALLER_FILE_PATH = 'TrpcModuleCallerFilePath';
5 | 
6 | export const ROUTER_METADATA_KEY = Symbol('trpc:router_type');
7 | 
8 | export const PROCEDURE_TYPE_KEY = Symbol('trpc:procedure_type');
9 | export const PROCEDURE_METADATA_KEY = Symbol('trpc:procedure_metadata');
10 | 
11 | export const PROCEDURE_PARAM_METADATA_KEY = Symbol(
12 |   'trpc:procedure_param_metadata',
13 | );
14 | 
15 | export const MIDDLEWARES_KEY = Symbol('trpc:middlewares_key');
16 | 
17 | // Logging Constants
18 | export const LOGGER_CONTEXT = 'TRPC';
```

packages/nestjs-trpc/lib/trpc.driver.ts
```
1 | import { ConsoleLogger, Inject, Injectable, Type } from '@nestjs/common';
2 | import { HttpAdapterHost, ModuleRef } from '@nestjs/core';
3 | import type { Application as ExpressApplication } from 'express';
4 | import type { FastifyInstance as FastifyApplication } from 'fastify';
5 | import { TRPCContext, TRPCModuleOptions } from './interfaces';
6 | import { AnyRouter, initTRPC } from '@trpc/server';
7 | import { TRPCFactory } from './factories/trpc.factory';
8 | import { AppRouterHost } from './app-router.host';
9 | import { ExpressDriver, FastifyDriver } from './drivers';
10 | 
11 | function isExpressApplication(app: any): app is ExpressApplication {
12 |   return (
13 |     typeof app === 'function' &&
14 |     typeof app.get === 'function' &&
15 |     typeof app.post === 'function' &&
16 |     typeof app.use === 'function' &&
17 |     typeof app.listen === 'function'
18 |   );
19 | }
20 | 
21 | function isFastifyApplication(app: any): app is FastifyApplication {
22 |   return (
23 |     typeof app === 'object' &&
24 |     app !== null &&
25 |     typeof app.get === 'function' &&
26 |     typeof app.post === 'function' &&
27 |     typeof app.register === 'function' &&
28 |     typeof app.listen === 'function'
29 |   );
30 | }
31 | 
32 | @Injectable()
33 | export class TRPCDriver<
34 |   TOptions extends Record<string, any> = TRPCModuleOptions,
35 | > {
36 |   @Inject(HttpAdapterHost)
37 |   protected readonly httpAdapterHost!: HttpAdapterHost;
38 | 
39 |   @Inject(TRPCFactory)
40 |   protected readonly trpcFactory!: TRPCFactory;
41 | 
42 |   @Inject(ConsoleLogger)
43 |   protected readonly consoleLogger!: ConsoleLogger;
44 | 
45 |   @Inject(AppRouterHost)
46 |   protected readonly appRouterHost!: AppRouterHost;
47 | 
48 |   @Inject(ExpressDriver)
49 |   protected readonly expressDriver!: ExpressDriver;
50 | 
51 |   @Inject(FastifyDriver)
52 |   protected readonly fastifyDriver!: FastifyDriver;
53 | 
54 |   constructor(private moduleRef: ModuleRef) {}
55 | 
56 |   public async start(options: TRPCModuleOptions) {
57 |     //@ts-expect-error Ignoring typescript here since it's the same type, yet it still isn't able to infer it.
58 |     const { procedure, router } = initTRPC.context().create({
59 |       ...(options.transformer != null
60 |         ? { transformer: options.transformer }
61 |         : {}),
62 |       ...(options.errorFormatter != null
63 |         ? { errorFormatter: options.errorFormatter }
64 |         : {}),
65 |     });
66 | 
67 |     const appRouter: AnyRouter = this.trpcFactory.serializeAppRoutes(
68 |       router,
69 |       procedure,
70 |     );
71 | 
72 |     this.appRouterHost.appRouter = appRouter;
73 | 
74 |     const contextClass = options.context;
75 |     const contextInstance =
76 |       contextClass != null
77 |         ? this.moduleRef.get<Type<TRPCContext>, TRPCContext>(contextClass, {
78 |             strict: false,
79 |           })
80 |         : null;
81 | 
82 |     const { httpAdapter } = this.httpAdapterHost;
83 |     const platformName = httpAdapter.getType();
84 | 
85 |     const app = httpAdapter.getInstance<
86 |       ExpressApplication | FastifyApplication
87 |     >();
88 | 
89 |     if (platformName === 'express' && isExpressApplication(app)) {
90 |       await this.expressDriver.start(options, app, appRouter, contextInstance);
91 |     } else if (platformName === 'fastify' && isFastifyApplication(app)) {
92 |       await this.fastifyDriver.start(options, app, appRouter, contextInstance);
93 |     } else {
94 |       throw new Error(`Unsupported http adapter: ${platformName}`);
95 |     }
96 |   }
97 | }
```

packages/nestjs-trpc/lib/trpc.enum.ts
```
1 | export enum ProcedureType {
2 |   Query = 'Query',
3 |   Mutation = 'Mutation',
4 | }
```

packages/nestjs-trpc/lib/trpc.module.ts
```
1 | import { ConsoleLogger, Inject, Module } from '@nestjs/common';
2 | import { DynamicModule, OnModuleInit } from '@nestjs/common/interfaces';
3 | import { HttpAdapterHost } from '@nestjs/core';
4 | 
5 | import { LOGGER_CONTEXT, TRPC_MODULE_OPTIONS } from './trpc.constants';
6 | 
7 | import { TRPCModuleOptions } from './interfaces';
8 | import { TRPCDriver } from './trpc.driver';
9 | import { AppRouterHost } from './app-router.host';
10 | import { ExpressDriver, FastifyDriver } from './drivers';
11 | import { FileScanner } from './scanners/file.scanner';
12 | import { GeneratorModule } from './generators/generator.module';
13 | import { FactoryModule } from './factories/factory.module';
14 | import { ScannerModule } from './scanners/scanner.module';
15 | 
16 | @Module({
17 |   imports: [FactoryModule, ScannerModule],
18 |   providers: [
19 |     // NestJS Providers
20 |     ConsoleLogger,
21 | 
22 |     // Drivers
23 |     TRPCDriver,
24 |     FastifyDriver,
25 |     ExpressDriver,
26 | 
27 |     // Exports
28 |     AppRouterHost,
29 |   ],
30 |   exports: [AppRouterHost],
31 | })
32 | export class TRPCModule implements OnModuleInit {
33 |   @Inject(TRPC_MODULE_OPTIONS)
34 |   private readonly options!: TRPCModuleOptions;
35 | 
36 |   @Inject(ConsoleLogger)
37 |   private readonly consoleLogger!: ConsoleLogger;
38 | 
39 |   @Inject(HttpAdapterHost)
40 |   private readonly httpAdapterHost!: HttpAdapterHost;
41 | 
42 |   @Inject(TRPCDriver)
43 |   private readonly trpcDriver!: TRPCDriver;
44 | 
45 |   @Inject(AppRouterHost)
46 |   private readonly appRouterHost!: AppRouterHost;
47 | 
48 |   static forRoot(options: TRPCModuleOptions = {}): DynamicModule {
49 |     const imports: Array<DynamicModule> = [];
50 | 
51 |     if (options.autoSchemaFile != null) {
52 |       const fileScanner = new FileScanner();
53 |       const callerFilePath = fileScanner.getCallerFilePath();
54 |       imports.push(
55 |         GeneratorModule.forRoot({
56 |           outputDirPath: options.autoSchemaFile,
57 |           rootModuleFilePath: callerFilePath,
58 |           schemaFileImports: options.schemaFileImports,
59 |           context: options.context,
60 |         }),
61 |       );
62 |     }
63 | 
64 |     return {
65 |       module: TRPCModule,
66 |       imports,
67 |       providers: [{ provide: TRPC_MODULE_OPTIONS, useValue: options }],
68 |     };
69 |   }
70 | 
71 |   async onModuleInit() {
72 |     const httpAdapter = this.httpAdapterHost?.httpAdapter;
73 |     if (!httpAdapter) {
74 |       return;
75 |     }
76 | 
77 |     this.consoleLogger.setContext(LOGGER_CONTEXT);
78 | 
79 |     await this.trpcDriver.start(this.options);
80 | 
81 |     const platformName = httpAdapter.getType();
82 |     if (this.appRouterHost.appRouter != null) {
83 |       this.consoleLogger.log(
84 |         `Server has been initialized successfully using the ${platformName} driver.`,
85 |         'TRPC Server',
86 |       );
87 |     }
88 |   }
89 | }
```

packages/nestjs-trpc/lib/decorators/context.decorator.ts
```
1 | import {
2 |   ProcedureParamDecorator,
3 |   ProcedureParamDecoratorType,
4 | } from '../interfaces/factory.interface';
5 | import { PROCEDURE_PARAM_METADATA_KEY } from '../trpc.constants';
6 | 
7 | export function Ctx(): ParameterDecorator {
8 |   return (
9 |     target: object,
10 |     propertyKey: string | symbol | undefined,
11 |     parameterIndex?: number | TypedPropertyDescriptor<any>,
12 |   ) => {
13 |     if (propertyKey != null && typeof parameterIndex === 'number') {
14 |       const existingParams: Array<ProcedureParamDecorator> =
15 |         Reflect.getMetadata(
16 |           PROCEDURE_PARAM_METADATA_KEY,
17 |           target,
18 |           propertyKey,
19 |         ) || [];
20 | 
21 |       const procedureParamMetadata: ProcedureParamDecorator = {
22 |         type: ProcedureParamDecoratorType.Ctx,
23 |         index: parameterIndex,
24 |       };
25 |       existingParams.push(procedureParamMetadata);
26 |       Reflect.defineMetadata(
27 |         PROCEDURE_PARAM_METADATA_KEY,
28 |         existingParams,
29 |         target,
30 |         propertyKey,
31 |       );
32 |     }
33 |   };
34 | }
```

packages/nestjs-trpc/lib/decorators/index.ts
```
1 | export * from './router.decorator';
2 | 
3 | // Procedure Decorators
4 | export * from './middlewares.decorator';
5 | export * from './mutation.decorator';
6 | export * from './query.decorator';
7 | 
8 | // Procedure Param Decorators
9 | export * from './options.decorator';
10 | export * from './context.decorator';
11 | export * from './input.decorator';
12 | export * from './raw-input.decorator';
13 | export * from './type.decorator';
14 | export * from './path.decorator';
```

packages/nestjs-trpc/lib/decorators/input.decorator.ts
```
1 | import {
2 |   ProcedureParamDecorator,
3 |   ProcedureParamDecoratorType,
4 | } from '../interfaces/factory.interface';
5 | import { PROCEDURE_PARAM_METADATA_KEY } from '../trpc.constants';
6 | 
7 | /**
8 |  * Input procedure parameter decorator. Extracts the `input` parameter out of the procedure `opts`.
9 |  *
10 |  * @param key string to be used extracting a specific input key - `input[key]`.
11 |  *
12 |  * @see [Parameter Decorators](https://www.nestjs-trpc.io/docs/routers#parameter-decorators)
13 |  *
14 |  * @publicApi
15 |  */
16 | export function Input(key?: string): ParameterDecorator {
17 |   return (
18 |     target: object,
19 |     propertyKey: string | symbol | undefined,
20 |     parameterIndex: number,
21 |   ) => {
22 |     if (propertyKey != null && typeof parameterIndex === 'number') {
23 |       const existingParams: Array<ProcedureParamDecorator> =
24 |         Reflect.getMetadata(
25 |           PROCEDURE_PARAM_METADATA_KEY,
26 |           target,
27 |           propertyKey,
28 |         ) || [];
29 | 
30 |       const procedureParamMetadata: ProcedureParamDecorator = {
31 |         type: ProcedureParamDecoratorType.Input,
32 |         index: parameterIndex,
33 |         key,
34 |       };
35 |       existingParams.push(procedureParamMetadata);
36 |       Reflect.defineMetadata(
37 |         PROCEDURE_PARAM_METADATA_KEY,
38 |         existingParams,
39 |         target,
40 |         propertyKey,
41 |       );
42 |     }
43 |   };
44 | }
```

packages/nestjs-trpc/lib/decorators/middlewares.decorator.ts
```
1 | import type { Class, Constructor } from 'type-fest';
2 | import type { TRPCMiddleware } from '../interfaces';
3 | import { MIDDLEWARES_KEY } from '../trpc.constants';
4 | import { isFunction } from 'lodash';
5 | import { validateEach } from '../utils/validate-each.util';
6 | 
7 | /**
8 |  * TODO: Generate Return Context Type.
9 |  *
10 |  * Decorator that binds middlewares to the scope of the router or a procedure,
11 |  * depending on its context.
12 |  *
13 |  * When `@UseMiddlewares` is used at the router level, the middleware will be
14 |  * applied to every handler (method) in the router.
15 |  *
16 |  * When `@UseMiddlewares` is used at the individual handler level, the middleware
17 |  * will apply only to that specific method.
18 |  *
19 |  * @param middlewares a single middleware instance or class, or a list of comma separated middleware instances
20 |  * or classes.
21 |  *
22 |  * @see [Middlewares](https://nestjs-trpc.io/docs/middlewares)
23 |  *
24 |  * @publicApi
25 |  */
26 | export function UseMiddlewares(
27 |   ...middlewares: Array<Class<TRPCMiddleware> | Constructor<TRPCMiddleware>>
28 | ): MethodDecorator & ClassDecorator {
29 |   return (
30 |     target: any,
31 |     key?: string | symbol,
32 |     descriptor?: TypedPropertyDescriptor<any>,
33 |   ) => {
34 |     const isMiddlewareValid = (
35 |       middleware: Constructor<TRPCMiddleware> | Record<string, unknown>,
36 |     ) =>
37 |       middleware &&
38 |       (isFunction(middleware) ||
39 |         isFunction((middleware as Record<string, any>).use));
40 | 
41 |     if (descriptor) {
42 |       validateEach(
43 |         target.constructor,
44 |         middlewares,
45 |         isMiddlewareValid,
46 |         '@UseMiddlewares',
47 |         'middleware',
48 |       );
49 |       Reflect.defineMetadata(
50 |         MIDDLEWARES_KEY,
51 |         [...middlewares],
52 |         descriptor.value,
53 |       );
54 |       return descriptor;
55 |     }
56 |     validateEach(
57 |       target.constructor,
58 |       middlewares,
59 |       isMiddlewareValid,
60 |       '@UseMiddlewares',
61 |       'middleware',
62 |     );
63 |     Reflect.defineMetadata(MIDDLEWARES_KEY, [...middlewares], target);
64 |     return target;
65 |   };
66 | }
67 | 
68 | /**
69 |  * @deprecated Use `@UseMiddlewares` instead. This decorator is deprecated
70 |  * in order to satisfy NestJS naming convention fe. `@UseGuards`.
71 |  *
72 |  * Decorator that binds middlewares to the scope of the router or a procedure,
73 |  * depending on its context.
74 |  *
75 |  * When `@Middlewares` is used at the router level, the middleware will be
76 |  * applied to every handler (method) in the router.
77 |  *
78 |  * When `@Middlewares` is used at the individual handler level, the middleware
79 |  * will apply only to that specific method.
80 |  *
81 |  * @param middlewares a single middleware instance or class, or a list of comma separated middleware instances
82 |  * or classes.
83 |  *
84 |  * @see [Middlewares](https://nestjs-trpc.io/docs/middlewares)
85 |  *
86 |  * @publicApi
87 |  */
88 | export function Middlewares(
89 |   ...middlewares: Array<Class<TRPCMiddleware> | Constructor<TRPCMiddleware>>
90 | ): MethodDecorator & ClassDecorator {
91 |   return (
92 |     target: any,
93 |     key?: string | symbol,
94 |     descriptor?: TypedPropertyDescriptor<any>,
95 |   ) => {
96 |     const isMiddlewareValid = (
97 |       middleware: Constructor<TRPCMiddleware> | Record<string, unknown>,
98 |     ) =>
99 |       middleware &&
100 |       (isFunction(middleware) ||
101 |         isFunction((middleware as Record<string, any>).use));
102 | 
103 |     if (descriptor) {
104 |       validateEach(
105 |         target.constructor,
106 |         middlewares,
107 |         isMiddlewareValid,
108 |         '@Middlewares',
109 |         'middleware',
110 |       );
111 |       Reflect.defineMetadata(
112 |         MIDDLEWARES_KEY,
113 |         [...middlewares],
114 |         descriptor.value,
115 |       );
116 |       return descriptor;
117 |     }
118 |     validateEach(
119 |       target.constructor,
120 |       middlewares,
121 |       isMiddlewareValid,
122 |       '@Middlewares',
123 |       'middleware',
124 |     );
125 |     Reflect.defineMetadata(MIDDLEWARES_KEY, [...middlewares], target);
126 |     return target;
127 |   };
128 | }
```

packages/nestjs-trpc/lib/decorators/mutation.decorator.ts
```
1 | import { ZodSchema } from 'zod';
2 | import { applyDecorators, SetMetadata } from '@nestjs/common';
3 | import { PROCEDURE_METADATA_KEY, PROCEDURE_TYPE_KEY } from '../trpc.constants';
4 | import { ProcedureType } from '../trpc.enum';
5 | 
6 | /**
7 |  * Decorator that marks a router class method as a TRPC mutation procedure that can receive inbound
8 |  * requests and produce responses.
9 |  *
10 |  * An TRPC query procedure is mainly responsible for actions that modify or creates server-side data.
11 |  * for example `Mutation /trpc/userRouter.createUser`.
12 |  *
13 |  * @param {object} args configuration object specifying:
14 |  * - `input` - defines a `ZodSchema` validation logic for the input.
15 |  * - `output` - defines a `ZodSchema` validation logic for the output.
16 |  *
17 |  * @see [Method Decorators](https://nestjs-trpc.io/docs/routers#procedures)
18 |  *
19 |  * @publicApi
20 |  */
21 | export function Mutation(args?: { input?: ZodSchema; output?: ZodSchema }) {
22 |   return applyDecorators(
23 |     ...[
24 |       SetMetadata(PROCEDURE_TYPE_KEY, ProcedureType.Mutation),
25 |       SetMetadata(PROCEDURE_METADATA_KEY, args),
26 |     ],
27 |   );
28 | }
```

packages/nestjs-trpc/lib/decorators/options.decorator.ts
```
1 | import {
2 |   ProcedureParamDecorator,
3 |   ProcedureParamDecoratorType,
4 | } from '../interfaces/factory.interface';
5 | import { PROCEDURE_PARAM_METADATA_KEY } from '../trpc.constants';
6 | 
7 | /**
8 |  * Options procedure parameter decorator. Extracts the root `opts` parameter out of the procedure.
9 |  *
10 |  * @see [Parameter Decorators](https://www.nestjs-trpc.io/docs/routers#parameter-decorators)
11 |  *
12 |  * @publicApi
13 |  */
14 | export function Options(): ParameterDecorator {
15 |   return (
16 |     target: object,
17 |     propertyKey: string | symbol | undefined,
18 |     parameterIndex: number,
19 |   ) => {
20 |     if (propertyKey != null) {
21 |       const existingParams: Array<ProcedureParamDecorator> =
22 |         Reflect.getMetadata(
23 |           PROCEDURE_PARAM_METADATA_KEY,
24 |           target,
25 |           propertyKey,
26 |         ) || [];
27 | 
28 |       const procedureParamMetadata: ProcedureParamDecorator = {
29 |         type: ProcedureParamDecoratorType.Options,
30 |         index: parameterIndex,
31 |       };
32 |       existingParams.push(procedureParamMetadata);
33 |       Reflect.defineMetadata(
34 |         PROCEDURE_PARAM_METADATA_KEY,
35 |         existingParams,
36 |         target,
37 |         propertyKey,
38 |       );
39 |     }
40 |   };
41 | }
```

packages/nestjs-trpc/lib/decorators/path.decorator.ts
```
1 | import {
2 |   ProcedureParamDecorator,
3 |   ProcedureParamDecoratorType,
4 | } from '../interfaces/factory.interface';
5 | import { PROCEDURE_PARAM_METADATA_KEY } from '../trpc.constants';
6 | 
7 | /**
8 |  * Path procedure parameter decorator. Extracts the `path` parameter out of the procedure `opts`.
9 |  *
10 |  * @see [Parameter Decorators](https://www.nestjs-trpc.io/docs/routers#parameter-decorators)
11 |  *
12 |  * @publicApi
13 |  */
14 | export function Path(): ParameterDecorator {
15 |   return (
16 |     target: object,
17 |     propertyKey: string | symbol | undefined,
18 |     parameterIndex: number,
19 |   ) => {
20 |     if (propertyKey != null) {
21 |       const existingParams: Array<ProcedureParamDecorator> =
22 |         Reflect.getMetadata(
23 |           PROCEDURE_PARAM_METADATA_KEY,
24 |           target,
25 |           propertyKey,
26 |         ) || [];
27 | 
28 |       const procedureParamMetadata: ProcedureParamDecorator = {
29 |         type: ProcedureParamDecoratorType.Path,
30 |         index: parameterIndex,
31 |       };
32 |       existingParams.push(procedureParamMetadata);
33 |       Reflect.defineMetadata(
34 |         PROCEDURE_PARAM_METADATA_KEY,
35 |         existingParams,
36 |         target,
37 |         propertyKey,
38 |       );
39 |     }
40 |   };
41 | }
```

packages/nestjs-trpc/lib/decorators/query.decorator.ts
```
1 | import { ZodSchema } from 'zod';
2 | import { applyDecorators, SetMetadata } from '@nestjs/common';
3 | import { PROCEDURE_METADATA_KEY, PROCEDURE_TYPE_KEY } from '../trpc.constants';
4 | import { ProcedureType } from '../trpc.enum';
5 | 
6 | /**
7 |  * Decorator that marks a router class method as a TRPC query procedure that can receive inbound
8 |  * requests and produce responses.
9 |  *
10 |  * An TRPC query procedure is mainly responsible for actions that retrieve data.
11 |  * for example `Query /trpc/userRouter.getUsers`.
12 |  *
13 |  * @param {object} args configuration object specifying:
14 |  * - `input` - defines a `ZodSchema` validation logic for the input.
15 |  * - `output` - defines a `ZodSchema` validation logic for the output.
16 |  *
17 |  * @see [Method Decorators](https://nestjs-trpc.io/docs/routers#procedures)
18 |  *
19 |  * @publicApi
20 |  */
21 | export function Query(args?: { input?: ZodSchema; output?: ZodSchema }) {
22 |   return applyDecorators(
23 |     ...[
24 |       SetMetadata(PROCEDURE_TYPE_KEY, ProcedureType.Query),
25 |       SetMetadata(PROCEDURE_METADATA_KEY, args),
26 |     ],
27 |   );
28 | }
```

packages/nestjs-trpc/lib/decorators/raw-input.decorator.ts
```
1 | import {
2 |   ProcedureParamDecorator,
3 |   ProcedureParamDecoratorType,
4 | } from '../interfaces/factory.interface';
5 | import { PROCEDURE_PARAM_METADATA_KEY } from '../trpc.constants';
6 | 
7 | /**
8 |  * Raw Input procedure parameter decorator. Extracts the `rawInput` parameter out of the procedure `opts`.
9 |  *
10 |  * @see [Parameter Decorators](https://www.nestjs-trpc.io/docs/routers#parameter-decorators)
11 |  *
12 |  * @publicApi
13 |  */
14 | export function RawInput(): ParameterDecorator {
15 |   return (
16 |     target: object,
17 |     propertyKey: string | symbol | undefined,
18 |     parameterIndex: number,
19 |   ) => {
20 |     if (propertyKey != null) {
21 |       const existingParams: Array<ProcedureParamDecorator> =
22 |         Reflect.getMetadata(
23 |           PROCEDURE_PARAM_METADATA_KEY,
24 |           target,
25 |           propertyKey,
26 |         ) || [];
27 | 
28 |       const procedureParamMetadata: ProcedureParamDecorator = {
29 |         type: ProcedureParamDecoratorType.RawInput,
30 |         index: parameterIndex,
31 |       };
32 |       existingParams.push(procedureParamMetadata);
33 |       Reflect.defineMetadata(
34 |         PROCEDURE_PARAM_METADATA_KEY,
35 |         existingParams,
36 |         target,
37 |         propertyKey,
38 |       );
39 |     }
40 |   };
41 | }
```

packages/nestjs-trpc/lib/decorators/router.decorator.ts
```
1 | import { applyDecorators, SetMetadata } from '@nestjs/common';
2 | import { ROUTER_METADATA_KEY } from '../trpc.constants';
3 | import { FileScanner } from '../scanners/file.scanner';
4 | 
5 | const fileScanner = new FileScanner();
6 | 
7 | /**
8 |  * Decorator that marks a class as a TRPC router that can receive inbound
9 |  * requests and produce responses.
10 |  *
11 |  * An TRPC Router responds to inbound HTTP Requests and produces HTTP Responses.
12 |  * It defines a class that provides the context for one or more related procedures that correspond to HTTP request methods and associated routes
13 |  * for example `Query /trpc/userRouter.getUsers`, `Mutation /trpc/userRouter.createUser`.
14 |  *
15 |  *
16 |  * @param {object} args configuration object specifying:
17 |  * - `alias` - string that defines a router alias. The alias is used both in the auto schema file generation, and for the actual api access.
18 |  *
19 |  * @see [Routers](https://nestjs-trpc.io/docs/routers)
20 |  *
21 |  * @publicApi
22 |  */
23 | export function Router(args?: { alias?: string }): ClassDecorator {
24 |   const path = fileScanner.getCallerFilePath();
25 |   return applyDecorators(
26 |     ...[SetMetadata(ROUTER_METADATA_KEY, { alias: args?.alias, path })],
27 |   );
28 | }
```

packages/nestjs-trpc/lib/decorators/type.decorator.ts
```
1 | import {
2 |   ProcedureParamDecorator,
3 |   ProcedureParamDecoratorType,
4 | } from '../interfaces/factory.interface';
5 | import { PROCEDURE_PARAM_METADATA_KEY } from '../trpc.constants';
6 | 
7 | /**
8 |  * Type procedure parameter decorator. Extracts the `type` parameter out of the procedure `opts`.
9 |  *
10 |  * @see [Parameter Decorators](https://www.nestjs-trpc.io/docs/routers#parameter-decorators)
11 |  *
12 |  * @publicApi
13 |  */
14 | export function Type(): ParameterDecorator {
15 |   return (
16 |     target: object,
17 |     propertyKey: string | symbol | undefined,
18 |     parameterIndex: number,
19 |   ) => {
20 |     if (propertyKey != null) {
21 |       const existingParams: Array<ProcedureParamDecorator> =
22 |         Reflect.getMetadata(
23 |           PROCEDURE_PARAM_METADATA_KEY,
24 |           target,
25 |           propertyKey,
26 |         ) || [];
27 | 
28 |       const procedureParamMetadata: ProcedureParamDecorator = {
29 |         type: ProcedureParamDecoratorType.Type,
30 |         index: parameterIndex,
31 |       };
32 |       existingParams.push(procedureParamMetadata);
33 |       Reflect.defineMetadata(
34 |         PROCEDURE_PARAM_METADATA_KEY,
35 |         existingParams,
36 |         target,
37 |         propertyKey,
38 |       );
39 |     }
40 |   };
41 | }
```

packages/nestjs-trpc/lib/drivers/express.driver.ts
```
1 | import { Injectable } from '@nestjs/common';
2 | import type { Application as ExpressApplication } from 'express';
3 | import { TRPCContext, TRPCModuleOptions } from '../interfaces';
4 | import type { AnyRouter } from '@trpc/server';
5 | import * as trpcExpress from '@trpc/server/adapters/express';
6 | 
7 | @Injectable()
8 | export class ExpressDriver<
9 |   TOptions extends Record<string, any> = TRPCModuleOptions,
10 | > {
11 |   public async start(
12 |     options: TRPCModuleOptions,
13 |     app: ExpressApplication,
14 |     appRouter: AnyRouter,
15 |     contextInstance: TRPCContext | null,
16 |   ) {
17 |     app.use(
18 |       options.basePath ?? '/trpc',
19 |       trpcExpress.createExpressMiddleware({
20 |         router: appRouter,
21 |         ...(options.context != null && contextInstance != null
22 |           ? {
23 |               createContext: (opts) => contextInstance.create(opts),
24 |             }
25 |           : {}),
26 |       }),
27 |     );
28 |   }
29 | }
```

packages/nestjs-trpc/lib/drivers/fastify.driver.ts
```
1 | import { Injectable } from '@nestjs/common';
2 | import type { FastifyInstance as FastifyApplication } from 'fastify';
3 | import { ContextOptions, TRPCContext, TRPCModuleOptions } from '../interfaces';
4 | import type { AnyRouter } from '@trpc/server';
5 | import * as trpcFastify from '@trpc/server/adapters/fastify';
6 | 
7 | @Injectable()
8 | export class FastifyDriver<
9 |   TOptions extends Record<string, any> = TRPCModuleOptions,
10 | > {
11 |   public async start(
12 |     options: TRPCModuleOptions,
13 |     app: FastifyApplication,
14 |     appRouter: AnyRouter,
15 |     contextInstance: TRPCContext | null,
16 |   ) {
17 |     app.register(trpcFastify.fastifyTRPCPlugin, {
18 |       prefix: options.basePath ?? '/trpc',
19 |       trpcOptions: {
20 |         router: appRouter,
21 |         ...(options.context != null && contextInstance != null
22 |           ? {
23 |               createContext: (opts: ContextOptions) =>
24 |                 contextInstance.create(opts),
25 |             }
26 |           : {}),
27 |       },
28 |     });
29 |   }
30 | }
```

packages/nestjs-trpc/lib/drivers/index.ts
```
1 | export * from './fastify.driver';
2 | export * from './express.driver';
```

packages/nestjs-trpc/lib/generators/context.generator.ts
```
1 | import {
2 |   ClassDeclaration,
3 |   MethodDeclaration,
4 |   Type,
5 |   SyntaxKind,
6 |   SourceFile,
7 | } from 'ts-morph';
8 | import { Injectable } from '@nestjs/common';
9 | import type { TRPCContext } from '../interfaces';
10 | import type { Class } from 'type-fest';
11 | 
12 | @Injectable()
13 | export class ContextGenerator {
14 |   public async getContextInterface(
15 |     sourceFile: SourceFile,
16 |     context: Class<TRPCContext>,
17 |   ): Promise<string | null> {
18 |     const className = context?.name;
19 |     if (!className) {
20 |       return null;
21 |     }
22 | 
23 |     const contextInstance = new context();
24 | 
25 |     if (typeof contextInstance.create !== 'function') {
26 |       return null;
27 |     }
28 | 
29 |     const classDeclaration = this.getClassDeclaration(sourceFile, context.name);
30 | 
31 |     if (!classDeclaration) {
32 |       return null;
33 |     }
34 | 
35 |     const createMethod = classDeclaration.getMethod('create');
36 |     if (!createMethod) {
37 |       return null;
38 |     }
39 | 
40 |     const ctxType = this.extractReturnTypeFromCreateMethod(createMethod);
41 |     if (!ctxType) {
42 |       return null;
43 |     }
44 | 
45 |     return ctxType.getText();
46 |   }
47 | 
48 |   private extractReturnTypeFromCreateMethod(
49 |     createMethod: MethodDeclaration,
50 |   ): Type | null {
51 |     const body = createMethod.getBody();
52 |     if (!body) return null;
53 | 
54 |     // Find the return statement
55 |     const returnStatement = body
56 |       .getDescendantsOfKind(SyntaxKind.ReturnStatement)
57 |       .find((statement) => statement.getExpression() !== undefined);
58 | 
59 |     if (!returnStatement) return null;
60 | 
61 |     const returnExpression = returnStatement.getExpression();
62 |     if (!returnExpression) return null;
63 | 
64 |     // Get the type of the returned expression
65 |     const returnType = returnExpression.getType();
66 | 
67 |     // Check if the type is a Promise
68 |     if (this.isPromiseType(returnType)) {
69 |       // Get the type argument of the Promise
70 |       const typeArguments = returnType.getTypeArguments();
71 |       return typeArguments.length > 0 ? typeArguments[0] : null;
72 |     }
73 | 
74 |     return returnType;
75 |   }
76 | 
77 |   private isPromiseType(type: Type): boolean {
78 |     return (
79 |       type.getSymbol()?.getName() === 'Promise' ||
80 |       type.getSymbol()?.getName() === '__global.Promise' ||
81 |       type.getText().startsWith('Promise<')
82 |     );
83 |   }
84 | 
85 |   private getClassDeclaration(
86 |     sourceFile: SourceFile,
87 |     className: string,
88 |   ): ClassDeclaration | undefined {
89 |     const classDeclaration = sourceFile.getClass(className);
90 |     if (classDeclaration) {
91 |       return classDeclaration;
92 |     }
93 |     return undefined;
94 |   }
95 | }
```

packages/nestjs-trpc/lib/generators/decorator.generator.ts
```
1 | import {
2 |   Decorator,
3 |   Expression,
4 |   Project,
5 |   SourceFile,
6 |   SyntaxKind,
7 | } from 'ts-morph';
8 | import { DecoratorGeneratorMetadata } from '../interfaces/generator.interface';
9 | import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
10 | import { ProcedureGenerator } from './procedure.generator';
11 | 
12 | @Injectable()
13 | export class DecoratorGenerator {
14 |   @Inject(ConsoleLogger)
15 |   private readonly consoleLogger!: ConsoleLogger;
16 | 
17 |   @Inject(ProcedureGenerator)
18 |   private readonly procedureGenerator!: ProcedureGenerator;
19 | 
20 |   public serializeProcedureDecorators(
21 |     decorators: Decorator[],
22 |     sourceFile: SourceFile,
23 |     project: Project,
24 |   ): Array<DecoratorGeneratorMetadata> {
25 |     return decorators.reduce<DecoratorGeneratorMetadata[]>(
26 |       (array, decorator) => {
27 |         const decoratorName = decorator.getName();
28 | 
29 |         if (decoratorName === 'Query' || decoratorName === 'Mutation') {
30 |           const input = this.getDecoratorPropertyValue(
31 |             decorator,
32 |             'input',
33 |             sourceFile,
34 |             project,
35 |           );
36 |           const output = this.getDecoratorPropertyValue(
37 |             decorator,
38 |             'output',
39 |             sourceFile,
40 |             project,
41 |           );
42 | 
43 |           array.push({
44 |             name: decoratorName,
45 |             arguments: {
46 |               ...(input ? { input } : {}),
47 |               ...(output ? { output } : {}),
48 |             },
49 |           });
50 |         } else if (
51 |           decoratorName === 'UseMiddlewares' ||
52 |           decoratorName === 'Middlewares'
53 |         ) {
54 |           return array;
55 |         } else {
56 |           this.consoleLogger.warn(`Decorator ${decoratorName}, not supported.`);
57 |         }
58 | 
59 |         return array;
60 |       },
61 |       [],
62 |     );
63 |   }
64 | 
65 |   public getDecoratorPropertyValue(
66 |     decorator: Decorator,
67 |     propertyName: string,
68 |     sourceFile: SourceFile,
69 |     project: Project,
70 |   ): string | null {
71 |     const args = decorator.getArguments();
72 | 
73 |     for (const arg of args) {
74 |       if (arg.getKind() === SyntaxKind.ObjectLiteralExpression) {
75 |         const properties = (arg as any).getProperties();
76 |         const property = properties.find(
77 |           (p: any) => p.getName() === propertyName,
78 |         );
79 | 
80 |         if (!property) {
81 |           return null;
82 |         }
83 | 
84 |         const propertyInitializer: Expression = property.getInitializer();
85 |         return this.procedureGenerator.flattenZodSchema(
86 |           propertyInitializer,
87 |           sourceFile,
88 |           project,
89 |           propertyInitializer.getText(),
90 |         );
91 |       }
92 |     }
93 | 
94 |     return null;
95 |   }
96 | }
```

packages/nestjs-trpc/lib/generators/generator.constants.ts
```
1 | export const TYPESCRIPT_PROJECT = 'TypescriptProject';
2 | export const TYPESCRIPT_APP_ROUTER_SOURCE_FILE =
3 |   'TypescriptAppRouterSourceFile';
```

packages/nestjs-trpc/lib/generators/generator.interface.ts
```
1 | import type { SchemaImports, TRPCContext } from '../interfaces';
2 | import type { Class } from 'type-fest';
3 | 
4 | export interface GeneratorModuleOptions {
5 |   rootModuleFilePath: string;
6 |   context?: Class<TRPCContext>;
7 |   outputDirPath?: string;
8 |   schemaFileImports?: Array<SchemaImports>;
9 | }
```

packages/nestjs-trpc/lib/generators/generator.module.ts
```
1 | import { ConsoleLogger, Inject, Module, OnModuleInit } from '@nestjs/common';
2 | import { DynamicModule } from '@nestjs/common/interfaces';
3 | import { MetadataScanner } from '@nestjs/core';
4 | import { CompilerOptions, ModuleKind, Project, ScriptTarget } from 'ts-morph';
5 | 
6 | import { TRPCGenerator } from './trpc.generator';
7 | import { RouterGenerator } from './router.generator';
8 | import { StaticGenerator } from './static.generator';
9 | import { ContextGenerator } from './context.generator';
10 | import { MiddlewareGenerator } from './middleware.generator';
11 | import { DecoratorGenerator } from './decorator.generator';
12 | import { ProcedureGenerator } from './procedure.generator';
13 | import {
14 |   TYPESCRIPT_APP_ROUTER_SOURCE_FILE,
15 |   TYPESCRIPT_PROJECT,
16 | } from './generator.constants';
17 | import {
18 |   TRPC_GENERATOR_OPTIONS,
19 |   TRPC_MODULE_CALLER_FILE_PATH,
20 | } from '../trpc.constants';
21 | import { FactoryModule } from '../factories/factory.module';
22 | import { ScannerModule } from '../scanners/scanner.module';
23 | import * as path from 'node:path';
24 | import { GeneratorModuleOptions } from './generator.interface';
25 | 
26 | @Module({
27 |   imports: [FactoryModule, ScannerModule],
28 |   providers: [
29 |     // NestJS Providers
30 |     ConsoleLogger,
31 |     MetadataScanner,
32 | 
33 |     // Local Providers
34 |     TRPCGenerator,
35 |     RouterGenerator,
36 |     ProcedureGenerator,
37 |     DecoratorGenerator,
38 |     MiddlewareGenerator,
39 |     ContextGenerator,
40 |     StaticGenerator,
41 |   ],
42 |   exports: [TRPCGenerator],
43 | })
44 | export class GeneratorModule implements OnModuleInit {
45 |   @Inject(TRPCGenerator)
46 |   private readonly trpcGenerator!: TRPCGenerator;
47 | 
48 |   @Inject(TRPC_GENERATOR_OPTIONS)
49 |   private readonly options!: GeneratorModuleOptions;
50 | 
51 |   static forRoot(options: GeneratorModuleOptions): DynamicModule {
52 |     const defaultCompilerOptions: CompilerOptions = {
53 |       target: ScriptTarget.ES2019,
54 |       module: ModuleKind.CommonJS,
55 |       emitDecoratorMetadata: true,
56 |       experimentalDecorators: true,
57 |       allowJs: true,
58 |       checkJs: true,
59 |       esModuleInterop: true,
60 |     };
61 |     const project = new Project({ compilerOptions: defaultCompilerOptions });
62 | 
63 |     const appRouterSourceFile = project.createSourceFile(
64 |       path.resolve(options.outputDirPath ?? './', 'server.ts'),
65 |       () => {},
66 |       { overwrite: true },
67 |     );
68 | 
69 |     return {
70 |       module: GeneratorModule,
71 |       providers: [
72 |         {
73 |           provide: TRPC_MODULE_CALLER_FILE_PATH,
74 |           useValue: options.rootModuleFilePath,
75 |         },
76 |         { provide: TYPESCRIPT_PROJECT, useValue: project },
77 |         {
78 |           provide: TYPESCRIPT_APP_ROUTER_SOURCE_FILE,
79 |           useValue: appRouterSourceFile,
80 |         },
81 |         { provide: TRPC_GENERATOR_OPTIONS, useValue: options },
82 |       ],
83 |     };
84 |   }
85 | 
86 |   async onModuleInit() {
87 |     await this.trpcGenerator.generateSchemaFile(this.options.schemaFileImports);
88 |     await this.trpcGenerator.generateHelpersFile(this.options.context);
89 |   }
90 | }
```

packages/nestjs-trpc/lib/generators/middleware.generator.ts
```
1 | import {
2 |   ClassDeclaration,
3 |   Node,
4 |   Project,
5 |   MethodDeclaration,
6 |   Type,
7 |   SyntaxKind,
8 |   SourceFile,
9 |   OptionalKind,
10 |   PropertySignatureStructure,
11 | } from 'ts-morph';
12 | import { Injectable } from '@nestjs/common';
13 | import { TRPCMiddleware } from '../interfaces';
14 | import type { Class } from 'type-fest';
15 | 
16 | @Injectable()
17 | export class MiddlewareGenerator {
18 |   public async getMiddlewareInterface(
19 |     routerFilePath: string,
20 |     middleware: Class<TRPCMiddleware>,
21 |     project: Project,
22 |   ): Promise<{
23 |     name: string;
24 |     properties: Array<OptionalKind<PropertySignatureStructure>>;
25 |   } | null> {
26 |     const className = middleware.name;
27 |     if (!className) {
28 |       return null;
29 |     }
30 | 
31 |     const middlewareInstance = new middleware();
32 | 
33 |     if (typeof middlewareInstance.use !== 'function') {
34 |       return null;
35 |     }
36 | 
37 |     const contextSourceFile = project.addSourceFileAtPath(routerFilePath);
38 | 
39 |     const classDeclaration = this.getClassDeclaration(
40 |       contextSourceFile,
41 |       middleware.name,
42 |     );
43 | 
44 |     if (!classDeclaration) {
45 |       return null;
46 |     }
47 | 
48 |     const useMethod = classDeclaration.getMethod('use');
49 |     if (!useMethod) {
50 |       return null;
51 |     }
52 | 
53 |     const ctxType = this.extractCtxTypeFromUseMethod(useMethod);
54 |     if (!ctxType) {
55 |       return null;
56 |     }
57 | 
58 |     return {
59 |       name: className,
60 |       properties: this.typeToProperties(ctxType),
61 |     };
62 |   }
63 | 
64 |   private extractCtxTypeFromUseMethod(
65 |     useMethod: MethodDeclaration,
66 |   ): Type | null {
67 |     const body = useMethod.getBody();
68 |     if (!body) return null;
69 | 
70 |     // Find the call to opts.next()
71 |     const nextCall = body
72 |       .getDescendantsOfKind(SyntaxKind.CallExpression)
73 |       .find((call) => {
74 |         const expression = call.getExpression();
75 |         return (
76 |           Node.isPropertyAccessExpression(expression) &&
77 |           expression.getName() === 'next' &&
78 |           Node.isIdentifier(expression.getExpression()) &&
79 |           expression.getExpression().getText() === 'opts'
80 |         );
81 |       });
82 | 
83 |     if (!nextCall) return null;
84 | 
85 |     // Get the argument passed to opts.next()
86 |     const nextArg = nextCall.getArguments()[0];
87 |     if (!Node.isObjectLiteralExpression(nextArg)) return null;
88 | 
89 |     // Find the 'ctx' property in the argument
90 |     const ctxProperty = nextArg
91 |       .getProperties()
92 |       .find(
93 |         (prop) => Node.isPropertyAssignment(prop) && prop.getName() === 'ctx',
94 |       );
95 | 
96 |     if (!Node.isPropertyAssignment(ctxProperty)) return null;
97 | 
98 |     // Get the type of the 'ctx' property value
99 |     return ctxProperty.getInitializer()?.getType() || null;
100 |   }
101 | 
102 |   private getClassDeclaration(
103 |     sourceFile: SourceFile,
104 |     className: string,
105 |   ): ClassDeclaration | undefined {
106 |     const classDeclaration = sourceFile.getClass(className);
107 |     if (classDeclaration) {
108 |       return classDeclaration;
109 |     }
110 |     return undefined;
111 |   }
112 | 
113 |   private typeToProperties(
114 |     type: Type,
115 |   ): Array<OptionalKind<PropertySignatureStructure>> {
116 |     const properties: Array<OptionalKind<PropertySignatureStructure>> = [];
117 | 
118 |     if (type.isObject()) {
119 |       type.getProperties().forEach((prop) => {
120 |         const propValueDeclaration = prop.getValueDeclaration();
121 |         if (propValueDeclaration != null) {
122 |           properties.push({
123 |             name: prop.getName(),
124 |             type: prop.getTypeAtLocation(propValueDeclaration).getText(),
125 |           });
126 |         }
127 |       });
128 |     }
129 | 
130 |     return properties;
131 |   }
132 | }
```

packages/nestjs-trpc/lib/generators/procedure.generator.ts
```
1 | import { Inject, Injectable } from '@nestjs/common';
2 | import { ProcedureGeneratorMetadata } from '../interfaces/generator.interface';
3 | import { ProcedureType } from '../trpc.enum';
4 | import { Project, SourceFile, Node } from 'ts-morph';
5 | import { ImportsScanner } from '../scanners/imports.scanner';
6 | import { StaticGenerator } from './static.generator';
7 | import { TYPESCRIPT_APP_ROUTER_SOURCE_FILE } from './generator.constants';
8 | 
9 | @Injectable()
10 | export class ProcedureGenerator {
11 |   @Inject(ImportsScanner)
12 |   private readonly importsScanner!: ImportsScanner;
13 | 
14 |   @Inject(StaticGenerator)
15 |   private readonly staticGenerator!: StaticGenerator;
16 | 
17 |   @Inject(TYPESCRIPT_APP_ROUTER_SOURCE_FILE)
18 |   private readonly appRouterSourceFile!: SourceFile;
19 | 
20 |   public generateProcedureString(
21 |     procedure: ProcedureGeneratorMetadata,
22 |   ): string {
23 |     const { name, decorators } = procedure;
24 |     const decorator = decorators.find(
25 |       (decorator) =>
26 |         decorator.name === ProcedureType.Mutation ||
27 |         decorator.name === ProcedureType.Query,
28 |     );
29 | 
30 |     if (!decorator) {
31 |       return '';
32 |     }
33 | 
34 |     const decoratorArgumentsArray = Object.entries(decorator.arguments)
35 |       .map(([key, value]) => `.${key}(${value})`)
36 |       .join('');
37 | 
38 |     return `${name}: publicProcedure${decoratorArgumentsArray}.${decorator.name.toLowerCase()}(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any )`;
39 |   }
40 | 
41 |   public flattenZodSchema(
42 |     node: Node,
43 |     sourceFile: SourceFile,
44 |     project: Project,
45 |     schema: string,
46 |   ): string {
47 |     const importsMap = this.importsScanner.buildSourceFileImportsMap(
48 |       sourceFile,
49 |       project,
50 |     );
51 |     if (Node.isIdentifier(node)) {
52 |       const identifierName = node.getText();
53 |       const identifierDeclaration =
54 |         sourceFile.getVariableDeclaration(identifierName);
55 | 
56 |       if (identifierDeclaration != null) {
57 |         const identifierInitializer = identifierDeclaration.getInitializer();
58 | 
59 |         if (identifierInitializer != null) {
60 |           const identifierSchema = this.flattenZodSchema(
61 |             identifierInitializer,
62 |             sourceFile,
63 |             project,
64 |             identifierInitializer.getText(),
65 |           );
66 | 
67 |           schema = schema.replace(identifierName, identifierSchema);
68 |         }
69 |       } else if (importsMap.has(identifierName)) {
70 |         const importedIdentifier = importsMap.get(identifierName);
71 | 
72 |         if (importedIdentifier != null) {
73 |           const { initializer } = importedIdentifier;
74 |           const identifierSchema = this.flattenZodSchema(
75 |             initializer,
76 |             importedIdentifier.sourceFile,
77 |             project,
78 |             initializer.getText(),
79 |           );
80 | 
81 |           schema = schema.replace(identifierName, identifierSchema);
82 |         }
83 |       }
84 |     } else if (Node.isObjectLiteralExpression(node)) {
85 |       for (const property of node.getProperties()) {
86 |         if (Node.isPropertyAssignment(property)) {
87 |           const propertyText = property.getText();
88 |           const propertyInitializer = property.getInitializer();
89 | 
90 |           if (propertyInitializer != null) {
91 |             schema = schema.replace(
92 |               propertyText,
93 |               this.flattenZodSchema(
94 |                 propertyInitializer,
95 |                 sourceFile,
96 |                 project,
97 |                 propertyText,
98 |               ),
99 |             );
100 |           }
101 |         }
102 |       }
103 |     } else if (Node.isArrayLiteralExpression(node)) {
104 |       for (const element of node.getElements()) {
105 |         const elementText = element.getText();
106 |         schema = schema.replace(
107 |           elementText,
108 |           this.flattenZodSchema(element, sourceFile, project, elementText),
109 |         );
110 |       }
111 |     } else if (Node.isCallExpression(node)) {
112 |       const expression = node.getExpression();
113 |       if (
114 |         Node.isPropertyAccessExpression(expression) &&
115 |         !expression.getText().startsWith('z')
116 |       ) {
117 |         const baseSchema = this.flattenZodSchema(
118 |           expression,
119 |           sourceFile,
120 |           project,
121 |           expression.getText(),
122 |         );
123 |         const propertyName = expression.getName();
124 |         schema = schema.replace(
125 |           expression.getText(),
126 |           `${baseSchema}.${propertyName}`,
127 |         );
128 |       } else if (!expression.getText().startsWith('z')) {
129 |         this.staticGenerator.addSchemaImports(
130 |           this.appRouterSourceFile,
131 |           [expression.getText()],
132 |           importsMap,
133 |         );
134 |       }
135 | 
136 |       for (const arg of node.getArguments()) {
137 |         const argText = arg.getText();
138 |         schema = schema.replace(
139 |           argText,
140 |           this.flattenZodSchema(arg, sourceFile, project, argText),
141 |         );
142 |       }
143 |     } else if (Node.isPropertyAccessExpression(node)) {
144 |       schema = this.flattenZodSchema(
145 |         node.getExpression(),
146 |         sourceFile,
147 |         project,
148 |         node.getExpression().getText(),
149 |       );
150 |     }
151 | 
152 |     return schema;
153 |   }
154 | }
```

packages/nestjs-trpc/lib/generators/router.generator.ts
```
1 | import { Project } from 'ts-morph';
2 | import {
3 |   RouterGeneratorMetadata,
4 |   ProcedureGeneratorMetadata,
5 | } from '../interfaces/generator.interface';
6 | import {
7 |   RoutersFactoryMetadata,
8 |   ProcedureFactoryMetadata,
9 | } from '../interfaces/factory.interface';
10 | import { DecoratorGenerator } from './decorator.generator';
11 | import { Inject, Injectable } from '@nestjs/common';
12 | import { camelCase } from 'lodash';
13 | import { ProcedureGenerator } from './procedure.generator';
14 | 
15 | @Injectable()
16 | export class RouterGenerator {
17 |   @Inject(DecoratorGenerator)
18 |   private readonly decoratorHandler!: DecoratorGenerator;
19 | 
20 |   @Inject(ProcedureGenerator)
21 |   private readonly procedureGenerator!: ProcedureGenerator;
22 | 
23 |   public serializeRouters(
24 |     routers: Array<RoutersFactoryMetadata>,
25 |     project: Project,
26 |   ): Array<RouterGeneratorMetadata> {
27 |     return routers.map((router) => {
28 |       const proceduresMetadata = router.procedures.map((procedure) =>
29 |         this.serializeRouterProcedures(
30 |           router.path,
31 |           procedure,
32 |           router.name,
33 |           project,
34 |         ),
35 |       );
36 | 
37 |       return {
38 |         name: router.name,
39 |         alias: router.alias,
40 |         procedures: proceduresMetadata,
41 |       };
42 |     });
43 |   }
44 | 
45 |   private serializeRouterProcedures(
46 |     routerFilePath: string,
47 |     procedure: ProcedureFactoryMetadata,
48 |     routerName: string,
49 |     project: Project,
50 |   ): ProcedureGeneratorMetadata {
51 |     const sourceFile = project.addSourceFileAtPath(routerFilePath);
52 |     const classDeclaration = sourceFile.getClass(routerName);
53 | 
54 |     if (!classDeclaration) {
55 |       throw new Error(`Could not find router ${routerName} class declaration.`);
56 |     }
57 | 
58 |     const methodDeclaration = classDeclaration.getMethod(procedure.name);
59 | 
60 |     if (!methodDeclaration) {
61 |       throw new Error(`Could not find ${routerName}, method declarations.`);
62 |     }
63 | 
64 |     const decorators = methodDeclaration.getDecorators();
65 | 
66 |     if (!decorators) {
67 |       throw new Error(
68 |         `could not find ${methodDeclaration.getName()}, method decorators.`,
69 |       );
70 |     }
71 | 
72 |     const serializedDecorators =
73 |       this.decoratorHandler.serializeProcedureDecorators(
74 |         decorators,
75 |         sourceFile,
76 |         project,
77 |       );
78 | 
79 |     return {
80 |       name: procedure.name,
81 |       decorators: serializedDecorators,
82 |     };
83 |   }
84 | 
85 |   public generateRoutersStringFromMetadata(
86 |     routers: Array<RouterGeneratorMetadata>,
87 |   ): string {
88 |     return routers
89 |       .map((router) => {
90 |         const { name, procedures, alias } = router;
91 |         return `${alias ?? camelCase(name)}: t.router({ ${procedures
92 |           .map(this.procedureGenerator.generateProcedureString)
93 |           .join(',\n')} })`;
94 |       })
95 |       .join(',\n');
96 |   }
97 | }
```

packages/nestjs-trpc/lib/generators/static.generator.ts
```
1 | import {
2 |   ImportDeclarationStructure,
3 |   SourceFile,
4 |   StructureKind,
5 |   Type,
6 |   VariableDeclarationKind,
7 | } from 'ts-morph';
8 | import { Injectable } from '@nestjs/common';
9 | import { SourceFileImportsMap } from '../interfaces/generator.interface';
10 | import * as path from 'node:path';
11 | 
12 | @Injectable()
13 | export class StaticGenerator {
14 |   public generateStaticDeclaration(sourceFile: SourceFile): void {
15 |     sourceFile.addImportDeclaration({
16 |       kind: StructureKind.ImportDeclaration,
17 |       moduleSpecifier: '@trpc/server',
18 |       namedImports: ['initTRPC'],
19 |     });
20 |     sourceFile.addImportDeclaration({
21 |       kind: StructureKind.ImportDeclaration,
22 |       moduleSpecifier: 'zod',
23 |       namedImports: ['z'],
24 |     });
25 | 
26 |     sourceFile.addVariableStatements([
27 |       {
28 |         declarationKind: VariableDeclarationKind.Const,
29 |         declarations: [{ name: 't', initializer: 'initTRPC.create()' }],
30 |       },
31 |       {
32 |         declarationKind: VariableDeclarationKind.Const,
33 |         declarations: [{ name: 'publicProcedure', initializer: 't.procedure' }],
34 |       },
35 |     ]);
36 |   }
37 | 
38 |   public addSchemaImports(
39 |     sourceFile: SourceFile,
40 |     schemaImportNames: Array<string>,
41 |     importsMap: Map<string, SourceFileImportsMap>,
42 |   ): void {
43 |     const importDeclarations: ImportDeclarationStructure[] = [];
44 | 
45 |     for (const schemaImportName of schemaImportNames) {
46 |       for (const [importMapKey, importMapMetadata] of importsMap.entries()) {
47 |         if (schemaImportName == null || importMapKey !== schemaImportName) {
48 |           continue;
49 |         }
50 | 
51 |         const relativePath = path.relative(
52 |           path.dirname(sourceFile.getFilePath()),
53 |           importMapMetadata.sourceFile.getFilePath().replace(/\.ts$/, ''),
54 |         );
55 | 
56 |         importDeclarations.push({
57 |           kind: StructureKind.ImportDeclaration,
58 |           moduleSpecifier: relativePath.startsWith('.')
59 |             ? relativePath
60 |             : `./${relativePath}`,
61 |           namedImports: [schemaImportName],
62 |         });
63 |       }
64 |     }
65 | 
66 |     sourceFile.addImportDeclarations(importDeclarations);
67 |   }
68 | 
69 |   public findCtxOutProperty(type: Type): string | undefined {
70 |     const typeText = type.getText();
71 |     const ctxOutMatch = typeText.match(/_ctx_out:\s*{([^}]*)}/);
72 | 
73 |     return ctxOutMatch ? ctxOutMatch[1].trim() : undefined;
74 |   }
75 | }
```

packages/nestjs-trpc/lib/generators/trpc.generator.ts
```
1 | import * as path from 'node:path';
2 | import {
3 |   ConsoleLogger,
4 |   Inject,
5 |   Injectable,
6 |   OnModuleInit,
7 | } from '@nestjs/common';
8 | import { Project, SourceFile } from 'ts-morph';
9 | import { saveOrOverrideFile } from '../utils/ts-morph.util';
10 | import { RouterGenerator } from './router.generator';
11 | import { SchemaImports, TRPCContext } from '../interfaces';
12 | import { MiddlewareGenerator } from './middleware.generator';
13 | import type { Class } from 'type-fest';
14 | import { ContextGenerator } from './context.generator';
15 | import { RouterFactory } from '../factories/router.factory';
16 | import { MiddlewareFactory } from '../factories/middleware.factory';
17 | import { ProcedureFactory } from '../factories/procedure.factory';
18 | import { TRPC_MODULE_CALLER_FILE_PATH } from '../trpc.constants';
19 | import { SourceFileImportsMap } from '../interfaces/generator.interface';
20 | import { StaticGenerator } from './static.generator';
21 | import { ImportsScanner } from '../scanners/imports.scanner';
22 | import {
23 |   TYPESCRIPT_APP_ROUTER_SOURCE_FILE,
24 |   TYPESCRIPT_PROJECT,
25 | } from './generator.constants';
26 | import * as process from 'node:process';
27 | 
28 | @Injectable()
29 | export class TRPCGenerator implements OnModuleInit {
30 |   private rootModuleImportsMap!: Map<string, SourceFileImportsMap>;
31 |   private readonly HELPER_TYPES_OUTPUT_FILE = 'index.ts';
32 |   private readonly HELPER_TYPES_OUTPUT_PATH = path.join(__dirname, 'types');
33 | 
34 |   @Inject(TRPC_MODULE_CALLER_FILE_PATH)
35 |   private readonly moduleCallerFilePath!: string;
36 | 
37 |   @Inject(TYPESCRIPT_PROJECT)
38 |   private readonly project!: Project;
39 | 
40 |   @Inject(TYPESCRIPT_APP_ROUTER_SOURCE_FILE)
41 |   private readonly appRouterSourceFile!: SourceFile;
42 | 
43 |   @Inject(ConsoleLogger)
44 |   private readonly consoleLogger!: ConsoleLogger;
45 | 
46 |   @Inject(StaticGenerator)
47 |   private readonly staticGenerator!: StaticGenerator;
48 | 
49 |   @Inject(MiddlewareGenerator)
50 |   private readonly middlewareHandler!: MiddlewareGenerator;
51 | 
52 |   @Inject(ContextGenerator)
53 |   private readonly contextHandler!: ContextGenerator;
54 | 
55 |   @Inject(RouterGenerator)
56 |   private readonly serializerHandler!: RouterGenerator;
57 | 
58 |   @Inject(RouterFactory)
59 |   private readonly routerFactory!: RouterFactory;
60 | 
61 |   @Inject(ProcedureFactory)
62 |   private readonly procedureFactory!: ProcedureFactory;
63 | 
64 |   @Inject(MiddlewareFactory)
65 |   private readonly middlewareFactory!: MiddlewareFactory;
66 | 
67 |   @Inject(ImportsScanner)
68 |   private readonly importsScanner!: ImportsScanner;
69 | 
70 |   onModuleInit() {
71 |     this.rootModuleImportsMap = this.buildRootImportsMap();
72 |   }
73 | 
74 |   public async generateSchemaFile(
75 |     schemaImports?: Array<SchemaImports> | undefined,
76 |   ): Promise<void> {
77 |     try {
78 |       const routers = this.routerFactory.getRouters();
79 |       const mappedRoutesAndProcedures = routers.map((route) => {
80 |         const { instance, name, alias, path } = route;
81 |         const prototype = Object.getPrototypeOf(instance);
82 |         const procedures = this.procedureFactory.getProcedures(
83 |           instance,
84 |           prototype,
85 |         );
86 | 
87 |         return { name, path, alias, instance: { ...route }, procedures };
88 |       });
89 | 
90 |       this.staticGenerator.generateStaticDeclaration(this.appRouterSourceFile);
91 | 
92 |       if (schemaImports != null && schemaImports.length > 0) {
93 |         const schemaImportNames: Array<string> = schemaImports.map(
94 |           (schemaImport) => (schemaImport as any).name,
95 |         );
96 |         this.staticGenerator.addSchemaImports(
97 |           this.appRouterSourceFile,
98 |           schemaImportNames,
99 |           this.rootModuleImportsMap,
100 |         );
101 |       }
102 | 
103 |       const routersMetadata = this.serializerHandler.serializeRouters(
104 |         mappedRoutesAndProcedures,
105 |         this.project,
106 |       );
107 | 
108 |       const routersStringDeclarations =
109 |         this.serializerHandler.generateRoutersStringFromMetadata(
110 |           routersMetadata,
111 |         );
112 | 
113 |       this.appRouterSourceFile.addStatements(/* ts */ `
114 |         const appRouter = t.router({${routersStringDeclarations}});
115 |         export type AppRouter = typeof appRouter;
116 |       `);
117 | 
118 |       await saveOrOverrideFile(this.appRouterSourceFile);
119 | 
120 |       this.consoleLogger.log(
121 |         `AppRouter has been updated successfully at "./${path.relative(process.cwd(), this.appRouterSourceFile.getFilePath())}".`,
122 |         'TRPC Generator',
123 |       );
124 |     } catch (error: unknown) {
125 |       this.consoleLogger.warn('TRPC Generator encountered an error.', error);
126 |     }
127 |   }
128 | 
129 |   public async generateHelpersFile(
130 |     context?: Class<TRPCContext>,
131 |   ): Promise<void> {
132 |     try {
133 |       const middlewares = this.middlewareFactory.getMiddlewares();
134 |       const helperTypesSourceFile = this.project.createSourceFile(
135 |         path.resolve(
136 |           this.HELPER_TYPES_OUTPUT_PATH,
137 |           this.HELPER_TYPES_OUTPUT_FILE,
138 |         ),
139 |         undefined,
140 |         { overwrite: true },
141 |       );
142 | 
143 |       if (context != null) {
144 |         const contextImport = this.rootModuleImportsMap.get(context.name);
145 | 
146 |         if (contextImport == null) {
147 |           throw new Error('Could not find context import declaration.');
148 |         }
149 | 
150 |         const contextType = await this.contextHandler.getContextInterface(
151 |           contextImport.sourceFile,
152 |           context,
153 |         );
154 | 
155 |         helperTypesSourceFile.addTypeAlias({
156 |           isExported: true,
157 |           name: 'Context',
158 |           type: contextType ?? '{}',
159 |         });
160 |       }
161 | 
162 |       for (const middleware of middlewares) {
163 |         const middlewareInterface =
164 |           await this.middlewareHandler.getMiddlewareInterface(
165 |             middleware.path,
166 |             middleware.instance,
167 |             this.project,
168 |           );
169 | 
170 |         if (middlewareInterface != null) {
171 |           helperTypesSourceFile.addInterface({
172 |             isExported: true,
173 |             name: `${middlewareInterface.name}Context`,
174 |             extends: ['Context'],
175 |             properties: middlewareInterface.properties,
176 |           });
177 |         }
178 |       }
179 | 
180 |       await saveOrOverrideFile(helperTypesSourceFile);
181 | 
182 |       this.consoleLogger.log(
183 |         `Helper types has been updated successfully at "nestjs-trpc/types".`,
184 |         'TRPC Generator',
185 |       );
186 |     } catch (e: unknown) {
187 |       this.consoleLogger.warn('TRPC Generator encountered an error.', e);
188 |     }
189 |   }
190 | 
191 |   private buildRootImportsMap(): Map<string, SourceFileImportsMap> {
192 |     const rootModuleSourceFile = this.project.addSourceFileAtPathIfExists(
193 |       this.moduleCallerFilePath,
194 |     );
195 | 
196 |     if (rootModuleSourceFile == null) {
197 |       throw new Error('Could not access root module file.');
198 |     }
199 | 
200 |     return this.importsScanner.buildSourceFileImportsMap(
201 |       rootModuleSourceFile,
202 |       this.project,
203 |     );
204 |   }
205 | }
```

packages/nestjs-trpc/lib/factories/factory.module.ts
```
1 | import { ConsoleLogger, Module } from '@nestjs/common';
2 | import { MetadataScanner } from '@nestjs/core';
3 | import { TRPCFactory } from './trpc.factory';
4 | import { RouterFactory } from './router.factory';
5 | import { ProcedureFactory } from './procedure.factory';
6 | import { MiddlewareFactory } from './middleware.factory';
7 | 
8 | @Module({
9 |   imports: [],
10 |   providers: [
11 |     // NestJS Providers
12 |     ConsoleLogger,
13 |     MetadataScanner,
14 | 
15 |     // Local Providers
16 |     TRPCFactory,
17 |     RouterFactory,
18 |     ProcedureFactory,
19 |     MiddlewareFactory,
20 |   ],
21 |   exports: [TRPCFactory, RouterFactory, ProcedureFactory, MiddlewareFactory],
22 | })
23 | export class FactoryModule {}
```

packages/nestjs-trpc/lib/factories/middleware.factory.ts
```
1 | import { Inject, Injectable } from '@nestjs/common';
2 | import { Class, Constructor } from 'type-fest';
3 | import { TRPCMiddleware } from '../interfaces';
4 | import { RouterFactory } from './router.factory';
5 | import { ProcedureFactory } from './procedure.factory';
6 | import { isEqual, uniqWith } from 'lodash';
7 | 
8 | interface MiddlewareMetadata {
9 |   path: string;
10 |   instance: Class<TRPCMiddleware> | Constructor<TRPCMiddleware>;
11 | }
12 | 
13 | @Injectable()
14 | export class MiddlewareFactory {
15 |   @Inject(RouterFactory)
16 |   private readonly routerFactory!: RouterFactory;
17 | 
18 |   @Inject(ProcedureFactory)
19 |   private readonly procedureFactory!: ProcedureFactory;
20 | 
21 |   getMiddlewares(): Array<MiddlewareMetadata> {
22 |     const routers = this.routerFactory.getRouters();
23 | 
24 |     const middlewaresMetadata = routers.flatMap((router) => {
25 |       const { instance, middlewares, path } = router;
26 |       const prototype = Object.getPrototypeOf(instance);
27 |       const procedures = this.procedureFactory.getProcedures(
28 |         instance,
29 |         prototype,
30 |       );
31 | 
32 |       const procedureMiddleware = procedures.flatMap((procedure) => {
33 |         return procedure.middlewares ?? [];
34 |       });
35 | 
36 |       return [...middlewares, ...procedureMiddleware].map((middleware) => ({
37 |         path,
38 |         instance: middleware,
39 |       }));
40 |     });
41 | 
42 |     // Return a unique array of middlewares based on both path and instances
43 |     return uniqWith(middlewaresMetadata, isEqual);
44 |   }
45 | }
```

packages/nestjs-trpc/lib/factories/procedure.factory.ts
```
1 | import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
2 | import { MetadataScanner, ModuleRef } from '@nestjs/core';
3 | import {
4 |   MIDDLEWARES_KEY,
5 |   PROCEDURE_METADATA_KEY,
6 |   PROCEDURE_PARAM_METADATA_KEY,
7 |   PROCEDURE_TYPE_KEY,
8 | } from '../trpc.constants';
9 | import {
10 |   ProcedureFactoryMetadata,
11 |   ProcedureImplementation,
12 |   ProcedureParamDecorator,
13 |   ProcedureParamDecoratorType,
14 |   TRPCPublicProcedure,
15 | } from '../interfaces/factory.interface';
16 | import { ProcedureOptions, TRPCMiddleware } from '../interfaces';
17 | import type { Class, Constructor } from 'type-fest';
18 | import { ProcedureType } from '../trpc.enum';
19 | import { uniqWith, isEqual } from 'lodash';
20 | 
21 | @Injectable()
22 | export class ProcedureFactory {
23 |   @Inject(ConsoleLogger)
24 |   private readonly consoleLogger!: ConsoleLogger;
25 | 
26 |   @Inject(MetadataScanner)
27 |   private readonly metadataScanner!: MetadataScanner;
28 | 
29 |   constructor(private moduleRef: ModuleRef) {}
30 | 
31 |   getProcedures(
32 |     instance: any,
33 |     prototype: Record<string, (...args: Array<unknown>) => unknown>,
34 |   ): Array<ProcedureFactoryMetadata> {
35 |     const methodNames = this.metadataScanner.getAllMethodNames(instance);
36 | 
37 |     return methodNames.map((name) =>
38 |       this.extractProcedureMetadata(name, prototype),
39 |     );
40 |   }
41 | 
42 |   private extractProcedureParams(
43 |     prototype: object,
44 |     name: string,
45 |   ): Array<ProcedureParamDecorator> {
46 |     return Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, prototype, name);
47 |   }
48 | 
49 |   private extractProcedureMetadata(
50 |     name: string,
51 |     prototype: Record<string, ProcedureImplementation>,
52 |   ): ProcedureFactoryMetadata {
53 |     const callback = prototype[name];
54 | 
55 |     const type = Reflect.getMetadata(PROCEDURE_TYPE_KEY, callback);
56 |     const metadata = Reflect.getMetadata(PROCEDURE_METADATA_KEY, callback);
57 | 
58 |     const middlewares: Array<
59 |       Class<TRPCMiddleware> | Constructor<TRPCMiddleware>
60 |     > = Reflect.getMetadata(MIDDLEWARES_KEY, callback) || [];
61 | 
62 |     return {
63 |       input: metadata?.input,
64 |       output: metadata?.output,
65 |       middlewares,
66 |       type,
67 |       name: callback.name,
68 |       implementation: callback,
69 |       params: this.extractProcedureParams(prototype, name),
70 |     };
71 |   }
72 | 
73 |   serializeProcedures(
74 |     procedures: Array<ProcedureFactoryMetadata>,
75 |     instance: any,
76 |     camelCasedRouterName: string,
77 |     procedureBuilder: TRPCPublicProcedure,
78 |     routerMiddlewares: Array<
79 |       Constructor<TRPCMiddleware> | Class<TRPCMiddleware>
80 |     >,
81 |   ): Record<string, any> {
82 |     const serializedProcedures = Object.create({});
83 | 
84 |     for (const procedure of procedures) {
85 |       const { input, output, type, middlewares, name, params } = procedure;
86 | 
87 |       const uniqueMiddlewares = uniqWith(
88 |         [...routerMiddlewares, ...middlewares],
89 |         isEqual,
90 |       );
91 |       const procedureInstance = this.createProcedureInstance(
92 |         procedureBuilder,
93 |         uniqueMiddlewares,
94 |       );
95 |       const routerInstance = this.moduleRef.get(instance.constructor, {
96 |         strict: false,
97 |       });
98 | 
99 |       serializedProcedures[name] = this.createSerializedProcedure(
100 |         procedureInstance,
101 |         name,
102 |         input,
103 |         output,
104 |         type,
105 |         routerInstance,
106 |         params,
107 |       );
108 | 
109 |       this.consoleLogger.log(
110 |         `Mapped {${type}, ${camelCasedRouterName}.${name}} route.`,
111 |         'Router Factory',
112 |       );
113 |     }
114 | 
115 |     return serializedProcedures;
116 |   }
117 | 
118 |   private createProcedureInstance(
119 |     procedure: TRPCPublicProcedure,
120 |     middlewares: Array<Constructor<TRPCMiddleware> | Class<TRPCMiddleware>>,
121 |   ): TRPCPublicProcedure {
122 |     for (const middleware of middlewares) {
123 |       const customProcedureInstance = this.moduleRef.get(middleware, {
124 |         strict: false,
125 |       });
126 |       if (typeof customProcedureInstance.use === 'function') {
127 |         //@ts-expect-error this is expected since the type is correct.
128 |         procedure = procedure.use((opts) => customProcedureInstance.use(opts));
129 |       }
130 |     }
131 |     return procedure;
132 |   }
133 | 
134 |   private serializeProcedureParams(
135 |     opts: ProcedureOptions,
136 |     params: Array<ProcedureParamDecorator> | undefined,
137 |   ): Array<undefined | unknown> {
138 |     if (params == null) {
139 |       return [];
140 |     }
141 |     return new Array(Math.max(...params.map((val) => val.index)) + 1)
142 |       .fill(undefined)
143 |       .map((_val, idx) => {
144 |         const param = params.find((param) => param.index === idx);
145 |         if (param == null) {
146 |           return undefined;
147 |         }
148 |         if (param.type === ProcedureParamDecoratorType.Input) {
149 |           return param['key'] != null
150 |             ? opts[param.type]?.[param['key']]
151 |             : opts[param.type];
152 |         }
153 |         if (param.type === ProcedureParamDecoratorType.Options) {
154 |           return opts;
155 |         }
156 |         return opts[param.type];
157 |       });
158 |   }
159 | 
160 |   private createSerializedProcedure(
161 |     procedureInstance: TRPCPublicProcedure,
162 |     procedureName: string,
163 |     input: any,
164 |     output: any,
165 |     type: string,
166 |     routerInstance: Record<string, (...args: any[]) => any>,
167 |     params: Array<ProcedureParamDecorator> | undefined,
168 |   ): any {
169 |     const procedureWithInput = input
170 |       ? procedureInstance.input(input)
171 |       : procedureInstance;
172 |     const procedureWithOutput = output
173 |       ? procedureWithInput.output(output)
174 |       : procedureWithInput;
175 | 
176 |     const procedureInvocation = (opts: ProcedureOptions) => {
177 |       return routerInstance[procedureName](
178 |         ...this.serializeProcedureParams(opts, params),
179 |       );
180 |     };
181 | 
182 |     return type === ProcedureType.Mutation
183 |       ? procedureWithOutput.mutation(procedureInvocation as any)
184 |       : procedureWithOutput.query(procedureInvocation as any);
185 |   }
186 | }
```

packages/nestjs-trpc/lib/factories/router.factory.ts
```
1 | import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
2 | import { ModulesContainer } from '@nestjs/core';
3 | import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
4 | import { camelCase } from 'lodash';
5 | import { MIDDLEWARES_KEY, ROUTER_METADATA_KEY } from '../trpc.constants';
6 | import {
7 |   RouterInstance,
8 |   TRPCPublicProcedure,
9 |   TRPCRouter,
10 | } from '../interfaces/factory.interface';
11 | import { TRPCMiddleware } from '../interfaces';
12 | import { ProcedureFactory } from './procedure.factory';
13 | import { Class, Constructor } from 'type-fest';
14 | 
15 | @Injectable()
16 | export class RouterFactory {
17 |   @Inject(ConsoleLogger)
18 |   private readonly consoleLogger!: ConsoleLogger;
19 | 
20 |   @Inject(ModulesContainer)
21 |   private readonly modulesContainer!: ModulesContainer;
22 | 
23 |   @Inject(ProcedureFactory)
24 |   private readonly procedureFactory!: ProcedureFactory;
25 | 
26 |   getRouters(): Array<RouterInstance> {
27 |     const routers: Array<RouterInstance> = [];
28 | 
29 |     this.modulesContainer.forEach((moduleRef) => {
30 |       moduleRef.providers.forEach((wrapper: InstanceWrapper) => {
31 |         const router = this.extractRouterFromWrapper(wrapper);
32 |         if (router != null) {
33 |           routers.push(router);
34 |         }
35 |       });
36 |     });
37 | 
38 |     return routers;
39 |   }
40 | 
41 |   private extractRouterFromWrapper(
42 |     wrapper: InstanceWrapper,
43 |   ): RouterInstance | null {
44 |     const { instance, name } = wrapper;
45 | 
46 |     if (instance == null) {
47 |       return null;
48 |     }
49 | 
50 |     const router = Reflect.getMetadata(
51 |       ROUTER_METADATA_KEY,
52 |       instance.constructor,
53 |     );
54 | 
55 |     if (router == null) {
56 |       return null;
57 |     }
58 | 
59 |     const middlewares: Array<
60 |       Class<TRPCMiddleware> | Constructor<TRPCMiddleware>
61 |     > = Reflect.getMetadata(MIDDLEWARES_KEY, instance.constructor) || [];
62 | 
63 |     return {
64 |       name,
65 |       instance,
66 |       path: router.path,
67 |       alias: router.alias,
68 |       middlewares: middlewares,
69 |     };
70 |   }
71 | 
72 |   serializeRoutes(
73 |     router: TRPCRouter,
74 |     procedure: TRPCPublicProcedure,
75 |   ): Record<string, any> {
76 |     const routers = this.getRouters();
77 |     const routerSchema = Object.create({});
78 | 
79 |     routers.forEach((route) => {
80 |       const { instance, name, middlewares, alias } = route;
81 |       const camelCasedRouterName = camelCase(alias ?? name);
82 |       const prototype = Object.getPrototypeOf(instance);
83 | 
84 |       const procedures = this.procedureFactory.getProcedures(
85 |         instance,
86 |         prototype,
87 |       );
88 | 
89 |       this.consoleLogger.log(
90 |         `Router ${name} as ${camelCasedRouterName}.`,
91 |         'Router Factory',
92 |       );
93 | 
94 |       const routerProcedures = this.procedureFactory.serializeProcedures(
95 |         procedures,
96 |         instance,
97 |         camelCasedRouterName,
98 |         procedure,
99 |         middlewares,
100 |       );
101 | 
102 |       // TODO: To get this working with `trpc` v11, we need to remove the `router()` method from here.
103 |       routerSchema[camelCasedRouterName] = router(routerProcedures);
104 |     });
105 | 
106 |     return routerSchema;
107 |   }
108 | }
```

packages/nestjs-trpc/lib/factories/trpc.factory.ts
```
1 | import { Inject, Injectable } from '@nestjs/common';
2 | import { MergeRouters } from '@trpc/server/dist/core/internals/mergeRouters';
3 | import { AnyRouterDef } from '@trpc/server/dist/core/router';
4 | import { RouterFactory } from './router.factory';
5 | import { TRPCRouter } from '../interfaces/factory.interface';
6 | import { AnyRouter, ProcedureBuilder } from '@trpc/server';
7 | 
8 | @Injectable()
9 | export class TRPCFactory {
10 |   @Inject(RouterFactory)
11 |   private readonly routerFactory!: RouterFactory;
12 | 
13 |   serializeAppRoutes(
14 |     router: TRPCRouter,
15 |     procedure: ProcedureBuilder<any>,
16 |   ): MergeRouters<Array<AnyRouter>, AnyRouterDef> {
17 |     const routerSchema = this.routerFactory.serializeRoutes(router, procedure);
18 |     return router(routerSchema);
19 |   }
20 | }
```

packages/nestjs-trpc/lib/interfaces/context.interface.ts
```
1 | import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
2 | import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
3 | 
4 | export type ContextOptions =
5 |   | CreateExpressContextOptions
6 |   | CreateFastifyContextOptions;
7 | 
8 | export interface TRPCContext {
9 |   create(
10 |     opts: ContextOptions,
11 |   ): Record<string, unknown> | Promise<Record<string, unknown>>;
12 | }
```

packages/nestjs-trpc/lib/interfaces/factory.interface.ts
```
1 | import type {
2 |   ProcedureRouterRecord,
3 |   AnyRouter,
4 |   ProcedureBuilder,
5 |   ProcedureType,
6 |   ProcedureParams,
7 | } from '@trpc/server';
8 | import type { ZodSchema, ZodType, ZodTypeDef } from 'zod';
9 | import type { TRPCMiddleware } from './middleware.interface';
10 | import type { Class, Constructor } from 'type-fest';
11 | 
12 | export enum ProcedureParamDecoratorType {
13 |   Options = 'options',
14 |   Ctx = 'ctx',
15 |   Input = 'input',
16 |   RawInput = 'rawInput',
17 |   Type = 'type',
18 |   Path = 'path',
19 | }
20 | 
21 | export type ProcedureImplementation = ({
22 |   input,
23 |   output,
24 | }: {
25 |   input?: ZodType<any, ZodTypeDef, any>;
26 |   output?: ZodType<any, ZodTypeDef, any>;
27 | }) => any;
28 | 
29 | interface ProcedureParamDecoratorBase {
30 |   type: ProcedureParamDecoratorType;
31 |   index: number;
32 | }
33 | 
34 | export type ProcedureInputParamDecorator = ProcedureParamDecoratorBase & {
35 |   type: ProcedureParamDecoratorType.Input;
36 |   key?: string;
37 | };
38 | 
39 | export type ProcedureParamDecorator =
40 |   | ProcedureParamDecoratorBase
41 |   | ProcedureInputParamDecorator;
42 | 
43 | export interface ProcedureFactoryMetadata {
44 |   type: ProcedureType;
45 |   input: ZodSchema | undefined;
46 |   output: ZodSchema | undefined;
47 |   middlewares: Array<Constructor<TRPCMiddleware> | Class<TRPCMiddleware>>;
48 |   name: string;
49 |   implementation: ProcedureImplementation;
50 |   params: Array<ProcedureParamDecorator> | undefined;
51 | }
52 | 
53 | export interface CustomProcedureFactoryMetadata {
54 |   name: string;
55 |   instance: unknown;
56 | }
57 | 
58 | export interface RouterInstance {
59 |   name: string;
60 |   path: string;
61 |   instance: unknown;
62 |   middlewares: Array<Class<TRPCMiddleware> | Constructor<TRPCMiddleware>>;
63 |   alias?: string;
64 | }
65 | 
66 | export interface RoutersFactoryMetadata {
67 |   name: string;
68 |   path: string;
69 |   alias?: string;
70 |   instance: RouterInstance;
71 |   procedures: Array<ProcedureFactoryMetadata>;
72 | }
73 | 
74 | export type TRPCRouter = <TProcRouterRecord extends ProcedureRouterRecord>(
75 |   procedures: TProcRouterRecord,
76 | ) => AnyRouter;
77 | 
78 | export type TRPCPublicProcedure = ProcedureBuilder<ProcedureParams>;
```

packages/nestjs-trpc/lib/interfaces/generator.interface.ts
```
1 | import {
2 |   ClassDeclaration,
3 |   EnumDeclaration,
4 |   Expression,
5 |   FunctionDeclaration,
6 |   InterfaceDeclaration,
7 |   SourceFile,
8 |   VariableDeclaration,
9 | } from 'ts-morph';
10 | 
11 | export interface RouterGeneratorMetadata {
12 |   name: string;
13 |   alias?: string;
14 |   procedures: Array<ProcedureGeneratorMetadata>;
15 | }
16 | 
17 | export interface ProcedureGeneratorMetadata {
18 |   name: string;
19 |   decorators: Array<DecoratorGeneratorMetadata>;
20 | }
21 | 
22 | export interface DecoratorGeneratorMetadata {
23 |   name: 'Query' | 'Mutation';
24 |   arguments: {
25 |     input?: string;
26 |     output?: string;
27 |   };
28 | }
29 | 
30 | export interface SourceFileImportsMap {
31 |   initializer:
32 |     | Expression
33 |     | ClassDeclaration
34 |     | InterfaceDeclaration
35 |     | EnumDeclaration
36 |     | VariableDeclaration
37 |     | FunctionDeclaration;
38 |   sourceFile: SourceFile;
39 | }
```

packages/nestjs-trpc/lib/interfaces/index.ts
```
1 | export * from './module-options.interface';
2 | export * from './middleware.interface';
3 | export * from './procedure-options.interface';
4 | export * from './context.interface';
```

packages/nestjs-trpc/lib/interfaces/middleware.interface.ts
```
1 | import type { ProcedureType, ProcedureParams } from '@trpc/server';
2 | import type { MiddlewareResult } from '@trpc/server/dist/core/middleware';
3 | 
4 | export type MiddlewareResponse =
5 |   | Promise<MiddlewareResult<ProcedureParams>>
6 |   | (<$Context>(opts: {
7 |       ctx: $Context;
8 |     }) => Promise<MiddlewareResult<ProcedureParams>>);
9 | 
10 | export type MiddlewareOptions<TContext extends object = object> = {
11 |   ctx: TContext;
12 |   type: ProcedureType;
13 |   path: string;
14 |   input: unknown;
15 |   rawInput: unknown;
16 |   meta: unknown;
17 |   next: (opts?: {
18 |     ctx: Record<string, unknown>;
19 |   }) => Promise<MiddlewareResult<ProcedureParams>>;
20 | };
21 | 
22 | export interface TRPCMiddleware {
23 |   use(
24 |     opts: MiddlewareOptions,
25 |   ): MiddlewareResponse | Promise<MiddlewareResponse>;
26 | }
```

packages/nestjs-trpc/lib/interfaces/module-options.interface.ts
```
1 | import { RootConfigTypes } from '@trpc/server/dist/core/internals/config';
2 | import { ErrorFormatter } from '@trpc/server/dist/error/formatter';
3 | import { TRPCErrorShape } from '@trpc/server/dist/rpc';
4 | import { TRPCContext } from './context.interface';
5 | import type { Class } from 'type-fest';
6 | import { ZodTypeAny } from 'zod';
7 | 
8 | export type SchemaImports =
9 |   | ((...args: Array<unknown>) => unknown)
10 |   | object
11 |   | ZodTypeAny;
12 | 
13 | /**
14 |  * "TRPCModule" options object.
15 |  */
16 | export interface TRPCModuleOptions {
17 |   /**
18 |    * Path to trpc app router and helpers types output.
19 |    */
20 |   autoSchemaFile?: string;
21 | 
22 |   /**
23 |    * Specifies additional imports for the schema file. This array can include functions, objects, or Zod schemas.
24 |    * While `nestjs-trpc` typically handles imports automatically, this option allows manual inclusion of imports for exceptional cases.
25 |    * Use this property only when automatic import resolution is insufficient.
26 |    *
27 |    * Please consider opening an issue on Github so we can update the adapter to better handle your case.
28 |    */
29 |   schemaFileImports?: Array<SchemaImports>;
30 | 
31 |   /**
32 |    * The base path for all trpc requests.
33 |    * @default "/trpc"
34 |    */
35 |   basePath?: string;
36 | 
37 |   /**
38 |    * The exposed trpc options when creating a route with either `createExpressMiddleware` or `createFastifyMiddleware`.
39 |    * If not provided, the adapter will use a default createContext.
40 |    * @link https://nestjs-trpc.io/docs/context
41 |    */
42 |   context?: Class<TRPCContext>;
43 | 
44 |   /**
45 |    * Use custom error formatting
46 |    * @link https://trpc.io/docs/error-formatting
47 |    */
48 |   errorFormatter?: ErrorFormatter<
49 |     RootConfigTypes['ctx'],
50 |     TRPCErrorShape<number> & { [key: string]: any }
51 |   >;
52 | 
53 |   /**
54 |    * Use a data transformer
55 |    * @link https://trpc.io/docs/data-transformers
56 |    */
57 |   transformer?: RootConfigTypes['transformer'];
58 | }
```

packages/nestjs-trpc/lib/interfaces/procedure-options.interface.ts
```
1 | import { ProcedureParams } from '@trpc/server';
2 | import { ResolveOptions } from '@trpc/server/dist/core/internals/utils';
3 | 
4 | export type ProcedureOptions = ResolveOptions<ProcedureParams> & {
5 |   type: string;
6 |   path: string;
7 |   rawInput: string;
8 | };
```

packages/nestjs-trpc/lib/interfaces/scanner.interface.ts
```
1 | export interface SourceMapping {
2 |   version: number;
3 |   file: string;
4 |   sourceRoot: string;
5 |   sources: Array<string>;
6 |   mappings: string;
7 | }
```

packages/nestjs-trpc/lib/scanners/file.scanner.ts
```
1 | import { Injectable } from '@nestjs/common';
2 | import * as fs from 'node:fs';
3 | import * as path from 'node:path';
4 | import { SourceMapping } from '../interfaces/scanner.interface';
5 | 
6 | /**
7 |  * For this specific file, using a static reference is desirable since `getCallerFilePath` uses a stack-trace to figure out the caller.
8 |  * If this class is injected through dependency injection, that stack-trace will vary!
9 |  */
10 | @Injectable()
11 | export class FileScanner {
12 |   public getCallerFilePath(skip: number = 2): string {
13 |     const originalPrepareStackTrace = Error.prepareStackTrace;
14 | 
15 |     Error.prepareStackTrace = (_, stack) => stack;
16 |     const error = new Error();
17 |     const stack = error.stack as unknown as NodeJS.CallSite[];
18 | 
19 |     Error.prepareStackTrace = originalPrepareStackTrace;
20 | 
21 |     const caller = stack[skip];
22 |     const jsFilePath = caller?.getFileName();
23 | 
24 |     if (jsFilePath == null) {
25 |       throw new Error(`Could not find caller file: ${caller}`);
26 |     }
27 | 
28 |     try {
29 |       // Attempt to find the source map file and extract the original TypeScript path
30 |       const sourceMap = this.getSourceMapFromJSPath(jsFilePath);
31 |       return this.normalizePath(
32 |         path.resolve(jsFilePath, '..', sourceMap.sources[0]),
33 |       );
34 |     } catch (error) {
35 |       // Suppress the warning if in test environment
36 |       if (process.env.NODE_ENV !== 'test') {
37 |         console.warn(
38 |           `Warning: Could not resolve source map for ${jsFilePath}. Falling back to default path resolution.`,
39 |         );
40 |       }
41 |       return this.normalizePath(jsFilePath);
42 |     }
43 |   }
44 | 
45 |   private normalizePath(p: string): string {
46 |     return path.resolve(p.replace(/\\/g, '/'));
47 |   }
48 | 
49 |   private getPlatformPath(p: string): string {
50 |     const exec = /^\/(\w*):(.*)/.exec(p);
51 |     return /^win/.test(process.platform) && exec
52 |       ? `${exec[1]}:\\${exec[2].replace(/\//g, '\\')}`
53 |       : p;
54 |   }
55 | 
56 |   private getSourceMapFromJSPath(sourcePath: string): SourceMapping {
57 |     const SOURCE_MAP_REGEX = /\/\/# sourceMappingURL=(.*\.map)$/m;
58 |     const filePath = this.getPlatformPath(sourcePath);
59 | 
60 |     let content: string;
61 |     try {
62 |       content = fs.readFileSync(filePath, { encoding: 'utf8' });
63 |     } catch (error) {
64 |       throw new Error(`Could not read source file at path: ${filePath}`);
65 |     }
66 | 
67 |     const exec = SOURCE_MAP_REGEX.exec(content);
68 |     if (exec == null) {
69 |       throw new Error(
70 |         `Could not find source map comment in file at path ${sourcePath}. Make sure "sourceMap" is enabled in your tsconfig.`,
71 |       );
72 |     }
73 | 
74 |     const sourceMapPath = path.resolve(filePath, '..', exec[1]);
75 |     let sourceMapContent: string;
76 |     try {
77 |       sourceMapContent = fs.readFileSync(sourceMapPath, { encoding: 'utf8' });
78 |     } catch (error) {
79 |       throw new Error(
80 |         `Could not read source map file at path: ${sourceMapPath}`,
81 |       );
82 |     }
83 | 
84 |     try {
85 |       return JSON.parse(sourceMapContent);
86 |     } catch (error) {
87 |       throw new Error(
88 |         `Failed to parse source map content from: ${sourceMapPath}`,
89 |       );
90 |     }
91 |   }
92 | }
```

packages/nestjs-trpc/lib/scanners/imports.scanner.ts
```
1 | import { Injectable } from '@nestjs/common';
2 | import { Project, SourceFile } from 'ts-morph';
3 | import { SourceFileImportsMap } from '../interfaces/generator.interface';
4 | 
5 | @Injectable()
6 | export class ImportsScanner {
7 |   public buildSourceFileImportsMap(
8 |     sourceFile: SourceFile,
9 |     project: Project,
10 |   ): Map<string, SourceFileImportsMap> {
11 |     const sourceFileImportsMap = new Map<string, SourceFileImportsMap>();
12 |     const importDeclarations = sourceFile.getImportDeclarations();
13 | 
14 |     for (const importDeclaration of importDeclarations) {
15 |       const namedImports = importDeclaration.getNamedImports();
16 |       for (const namedImport of namedImports) {
17 |         const name = namedImport.getName();
18 |         const importedSourceFile =
19 |           importDeclaration.getModuleSpecifierSourceFile();
20 | 
21 |         if (importedSourceFile == null) {
22 |           continue;
23 |         }
24 | 
25 |         const resolvedSourceFile =
26 |           importedSourceFile.getFilePath().endsWith('index.ts') &&
27 |           !importedSourceFile.getVariableDeclaration(name)
28 |             ? this.resolveBarrelFileImport(importedSourceFile, name, project)
29 |             : importedSourceFile;
30 | 
31 |         if (resolvedSourceFile == null) {
32 |           continue;
33 |         }
34 | 
35 |         // Generalized logic to handle various kinds of declarations
36 |         const declaration =
37 |           resolvedSourceFile.getVariableDeclaration(name) ||
38 |           resolvedSourceFile.getClass(name) ||
39 |           resolvedSourceFile.getInterface(name) ||
40 |           resolvedSourceFile.getEnum(name) ||
41 |           resolvedSourceFile.getFunction(name);
42 | 
43 |         if (declaration != null) {
44 |           const initializer =
45 |             'getInitializer' in declaration
46 |               ? declaration.getInitializer()
47 |               : declaration;
48 |           sourceFileImportsMap.set(name, {
49 |             initializer: initializer ?? declaration,
50 |             sourceFile: resolvedSourceFile,
51 |           });
52 |         }
53 |       }
54 |     }
55 | 
56 |     return sourceFileImportsMap;
57 |   }
58 | 
59 |   /**
60 |    * https://github.com/dsherret/ts-morph/issues/327
61 |    * Note that if the module resolution of the compiler is Classic then it won't resolve those implicit index.ts module specifiers.
62 |    * So for example, if the moduleResolution compiler option isn't explicitly set then setting the module
63 |    * compiler option to anything but ModuleKind.CommonJS will cause the module resolution kind to resolve to Classic.
64 |    * Additionally, if moduleResolution and the module compiler option isn't set,
65 |    * then a script target of ES2015 and above will also use Classic module resolution.
66 |    */
67 |   private resolveBarrelFileImport(
68 |     barrelSourceFile: SourceFile,
69 |     name: string,
70 |     project: Project,
71 |   ): SourceFile | undefined {
72 |     // Traverse through export declarations to find the actual source of the named import
73 |     for (const exportDeclaration of barrelSourceFile.getExportDeclarations()) {
74 |       const exportedSourceFile =
75 |         exportDeclaration.getModuleSpecifierSourceFile();
76 |       if (exportedSourceFile == null) continue;
77 | 
78 |       // Check if the named export is explicitly re-exported
79 |       const namedExports = exportDeclaration.getNamedExports();
80 |       if (namedExports.length > 0) {
81 |         const matchingExport = namedExports.find((e) => e.getName() === name);
82 |         if (matchingExport) {
83 |           return exportedSourceFile;
84 |         }
85 |       } else {
86 |         // Handle `export * from ...` case: recursively resolve the export
87 |         const schemaVariable = exportedSourceFile.getVariableDeclaration(name);
88 |         if (schemaVariable) {
89 |           return exportedSourceFile;
90 |         } else {
91 |           // Continue resolving if it's another barrel file
92 |           const baseSourceFile = this.resolveBarrelFileImport(
93 |             exportedSourceFile,
94 |             name,
95 |             project,
96 |           );
97 |           if (baseSourceFile) return baseSourceFile;
98 |         }
99 |       }
100 |     }
101 | 
102 |     return undefined;
103 |   }
104 | }
```

packages/nestjs-trpc/lib/scanners/scanner.module.ts
```
1 | import { Module } from '@nestjs/common';
2 | import { FileScanner } from './file.scanner';
3 | import { ImportsScanner } from './imports.scanner';
4 | 
5 | @Module({
6 |   imports: [],
7 |   providers: [FileScanner, ImportsScanner],
8 |   exports: [FileScanner, ImportsScanner],
9 | })
10 | export class ScannerModule {}
```

packages/nestjs-trpc/lib/utils/ts-morph.util.ts
```
1 | import { SourceFile } from 'ts-morph';
2 | 
3 | export async function saveOrOverrideFile(
4 |   sourceFile: SourceFile,
5 | ): Promise<void> {
6 |   sourceFile.formatText({ indentSize: 2 });
7 |   await sourceFile.save();
8 | }
```

packages/nestjs-trpc/lib/utils/validate-each.util.ts
```
1 | export class InvalidDecoratorItemException extends Error {
2 |   private readonly msg: string;
3 | 
4 |   constructor(decorator: string, item: string, context: string) {
5 |     const message = `Invalid ${item} passed to ${decorator}() decorator (${context}).`;
6 |     super(message);
7 | 
8 |     this.msg = message;
9 |   }
10 | 
11 |   public what(): string {
12 |     return this.msg;
13 |   }
14 | }
15 | 
16 | export function validateEach(
17 |   context: { name: string },
18 |   arr: any[],
19 |   predicate: (...args: any) => unknown,
20 |   decorator: string,
21 |   item: string,
22 | ): boolean {
23 |   if (!context || !context.name) {
24 |     return true;
25 |   }
26 |   const errors = arr.some((str) => !predicate(str));
27 |   if (errors) {
28 |     throw new InvalidDecoratorItemException(decorator, item, context.name);
29 |   }
30 |   return true;
31 | }
```

packages/nestjs-trpc/lib/decorators/__tests__/context.decorator.spec.ts
```
1 | import 'reflect-metadata';
2 | import { Ctx } from '../context.decorator';
3 | import { PROCEDURE_PARAM_METADATA_KEY } from '../../trpc.constants';
4 | import { ProcedureParamDecoratorType } from '../../interfaces/factory.interface';
5 | 
6 | describe('Context Decorator', () => {
7 |   class TestClass {
8 |     testMethod(@Ctx() param1: any, @Ctx() param2: any) {}
9 |   }
10 | 
11 |   it('should add metadata to the method parameters', () => {
12 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
13 |     expect(metadata).toBeDefined();
14 |     expect(Array.isArray(metadata)).toBe(true);
15 |   });
16 | 
17 |   it('should add correct metadata for each parameter', () => {
18 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
19 |     expect(metadata).toHaveLength(2);
20 | 
21 |     expect(metadata[0]).toEqual({
22 |       type: ProcedureParamDecoratorType.Ctx,
23 |       index: 1,
24 |     });
25 | 
26 |     expect(metadata[1]).toEqual({
27 |       type: ProcedureParamDecoratorType.Ctx,
28 |       index: 0,
29 |     });
30 |   });
31 | 
32 |   it('should not add metadata for properties', () => {
33 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testProperty');
34 |     expect(metadata).toBeUndefined();
35 |   });
36 | 
37 |   it('should append to existing metadata', () => {
38 |     class TestClassWithExistingMetadata {
39 |       testMethod(@Ctx() param1: any) {}
40 |     }
41 | 
42 |     // Simulate existing metadata
43 |     const existingMetadata = [{ type: 'SomeOtherDecorator', index: 0 }];
44 |     Reflect.defineMetadata(PROCEDURE_PARAM_METADATA_KEY, existingMetadata, TestClassWithExistingMetadata.prototype, 'testMethod');
45 | 
46 |     // Apply our decorator
47 |     Ctx()(TestClassWithExistingMetadata.prototype, 'testMethod', 1);
48 | 
49 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClassWithExistingMetadata.prototype, 'testMethod');
50 |     expect(metadata).toHaveLength(2);
51 |     expect(metadata[1]).toEqual({
52 |       type: ProcedureParamDecoratorType.Ctx,
53 |       index: 1,
54 |     });
55 |   });
56 | });
```

packages/nestjs-trpc/lib/decorators/__tests__/input.decorator.spec.ts
```
1 | import 'reflect-metadata';
2 | import { Input } from '../input.decorator';
3 | import { PROCEDURE_PARAM_METADATA_KEY } from '../../trpc.constants';
4 | import { ProcedureParamDecoratorType } from '../../interfaces/factory.interface';
5 | 
6 | describe('Input Decorator', () => {
7 |   class TestClass {
8 |     testMethod(@Input() param1: any, @Input('key') param2: any) {}
9 |   }
10 | 
11 |   it('should add metadata to the method', () => {
12 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
13 |     expect(metadata).toBeDefined();
14 |     expect(Array.isArray(metadata)).toBe(true);
15 |   });
16 | 
17 |   it('should add correct metadata for each parameter', () => {
18 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
19 |     expect(metadata).toHaveLength(2);
20 | 
21 |     expect(metadata[0]).toEqual({
22 |       type: ProcedureParamDecoratorType.Input,
23 |       index: 1,
24 |       key: 'key',
25 |     });
26 |     
27 |     expect(metadata[1]).toEqual({
28 |         type: ProcedureParamDecoratorType.Input,
29 |         index: 0,
30 |         key: undefined,
31 |     });
32 |   });
33 | 
34 |   it('should append to existing metadata', () => {
35 |     class TestClassWithExistingMetadata {
36 |       testMethod(@Input() param1: any) {}
37 |     }
38 | 
39 |     // Simulate existing metadata
40 |     const existingMetadata = [{ type: 'SomeOtherDecorator', index: 0 }];
41 |     Reflect.defineMetadata(PROCEDURE_PARAM_METADATA_KEY, existingMetadata, TestClassWithExistingMetadata.prototype, 'testMethod');
42 | 
43 |     // Apply our decorator
44 |     Input('newKey')(TestClassWithExistingMetadata.prototype, 'testMethod', 1);
45 | 
46 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClassWithExistingMetadata.prototype, 'testMethod');
47 |     expect(metadata).toHaveLength(2);
48 |     expect(metadata[1]).toEqual({
49 |       type: ProcedureParamDecoratorType.Input,
50 |       index: 1,
51 |       key: 'newKey',
52 |     });
53 |   });
54 | });
```

packages/nestjs-trpc/lib/decorators/__tests__/middlewares.decorator.spec.ts
```
1 | import 'reflect-metadata';
2 | import { UseMiddlewares } from '../middlewares.decorator';
3 | import { MIDDLEWARES_KEY } from '../../trpc.constants';
4 | import { MiddlewareOptions, MiddlewareResponse, TRPCMiddleware } from '../../interfaces';
5 | 
6 | describe('UseMiddlewares Decorator', () => {
7 |   class TestMiddleware implements TRPCMiddleware {
8 |     use(opts: MiddlewareOptions<object>): MiddlewareResponse | Promise<MiddlewareResponse> {
9 |       throw new Error('Method not implemented.');
10 |     }
11 |   }
12 | 
13 |   it('should add metadata to the class', () => {
14 |     @UseMiddlewares(TestMiddleware)
15 |     class TestClass {}
16 | 
17 |     const metadata = Reflect.getMetadata(MIDDLEWARES_KEY, TestClass);
18 |     expect(metadata).toStrictEqual([TestMiddleware]);
19 |   });
20 | 
21 |   it('should add metadata to the method', () => {
22 |     class TestClass {
23 |       @UseMiddlewares(TestMiddleware)
24 |       testMethod() {}
25 |     }
26 | 
27 |     const metadata = Reflect.getMetadata(MIDDLEWARES_KEY, TestClass.prototype.testMethod);
28 |     expect(metadata).toStrictEqual([TestMiddleware]);
29 |   });
30 | 
31 |   it('should throw an error for invalid middleware on class', () => {
32 |     expect(() => {
33 |       @UseMiddlewares({} as any)
34 |       class TestClass {}
35 |     }).toThrow();
36 |   });
37 | 
38 |   it('should throw an error for invalid middleware on method', () => {
39 |     expect(() => {
40 |       class TestClass {
41 |         @UseMiddlewares({} as any)
42 |         testMethod() {}
43 |       }
44 |     }).toThrow();
45 |   });
46 | });
```

packages/nestjs-trpc/lib/decorators/__tests__/mutation.decorator.spec.ts
```
1 | import 'reflect-metadata';
2 | import { Mutation } from '../mutation.decorator';
3 | import { PROCEDURE_METADATA_KEY, PROCEDURE_TYPE_KEY } from '../../trpc.constants';
4 | import { ProcedureType } from '../../trpc.enum';
5 | import { ZodSchema, z } from 'zod';
6 | 
7 | describe('Mutation Decorator', () => {
8 |   it('should set procedure type metadata', () => {
9 |     class TestClass {
10 |       @Mutation()
11 |       testMethod() {}
12 |     }
13 | 
14 |     const metadata = Reflect.getMetadata(PROCEDURE_TYPE_KEY, TestClass.prototype.testMethod);
15 |     expect(metadata).toBe(ProcedureType.Mutation);
16 |   });
17 | 
18 |   it('should set procedure metadata with input and output schemas', () => {
19 |     const inputSchema: ZodSchema = z.string();
20 |     const outputSchema: ZodSchema = z.number();
21 | 
22 |     class TestClass {
23 |       @Mutation({ input: inputSchema, output: outputSchema })
24 |       testMethod() {}
25 |     }
26 | 
27 |     const metadata = Reflect.getMetadata(PROCEDURE_METADATA_KEY, TestClass.prototype.testMethod);
28 |     expect(metadata).toEqual({ input: inputSchema, output: outputSchema });
29 |   });
30 | 
31 |   it('should set procedure metadata without schemas', () => {
32 |     class TestClass {
33 |       @Mutation()
34 |       testMethod() {}
35 |     }
36 | 
37 |     const metadata = Reflect.getMetadata(PROCEDURE_METADATA_KEY, TestClass.prototype.testMethod);
38 |     expect(metadata).toBeUndefined();
39 |   });
40 | 
41 |   it('should set procedure metadata with only input schema', () => {
42 |     const inputSchema: ZodSchema = z.string();
43 | 
44 |     class TestClass {
45 |       @Mutation({ input: inputSchema })
46 |       testMethod() {}
47 |     }
48 | 
49 |     const metadata = Reflect.getMetadata(PROCEDURE_METADATA_KEY, TestClass.prototype.testMethod);
50 |     expect(metadata).toEqual({ input: inputSchema });
51 |   });
52 | 
53 |   it('should set procedure metadata with only output schema', () => {
54 |     const outputSchema: ZodSchema = z.number();
55 | 
56 |     class TestClass {
57 |       @Mutation({ output: outputSchema })
58 |       testMethod() {}
59 |     }
60 | 
61 |     const metadata = Reflect.getMetadata(PROCEDURE_METADATA_KEY, TestClass.prototype.testMethod);
62 |     expect(metadata).toEqual({ output: outputSchema });
63 |   });
64 | });
```

packages/nestjs-trpc/lib/decorators/__tests__/options.decorator.spec.ts
```
1 | import 'reflect-metadata';
2 | import { Options } from '../options.decorator';
3 | import { PROCEDURE_PARAM_METADATA_KEY } from '../../trpc.constants';
4 | import { ProcedureParamDecoratorType } from '../../interfaces/factory.interface';
5 | 
6 | describe('Options Decorator', () => {
7 |   class TestClass {
8 |     testMethod(@Options() param1: any, @Options() param2: any) {}
9 |   }
10 | 
11 |   it('should add metadata to the method', () => {
12 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
13 |     expect(metadata).toBeDefined();
14 |     expect(Array.isArray(metadata)).toBe(true);
15 |   });
16 | 
17 |   it('should add correct metadata for each parameter', () => {
18 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
19 |     expect(metadata).toHaveLength(2);
20 | 
21 |     expect(metadata[0]).toEqual({
22 |       type: ProcedureParamDecoratorType.Options,
23 |       index: 1,
24 |     });
25 | 
26 |     expect(metadata[1]).toEqual({
27 |       type: ProcedureParamDecoratorType.Options,
28 |       index: 0,
29 |     });
30 |   });
31 | 
32 |   it('should append to existing metadata', () => {
33 |     class TestClassWithExistingMetadata {
34 |       testMethod(@Options() param1: any) {}
35 |     }
36 | 
37 |     // Simulate existing metadata
38 |     const existingMetadata = [{ type: 'SomeOtherDecorator', index: 0 }];
39 |     Reflect.defineMetadata(PROCEDURE_PARAM_METADATA_KEY, existingMetadata, TestClassWithExistingMetadata.prototype, 'testMethod');
40 | 
41 |     // Apply our decorator
42 |     Options()(TestClassWithExistingMetadata.prototype, 'testMethod', 1);
43 | 
44 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClassWithExistingMetadata.prototype, 'testMethod');
45 |     expect(metadata).toHaveLength(2);
46 |     expect(metadata[1]).toEqual({
47 |       type: ProcedureParamDecoratorType.Options,
48 |       index: 1,
49 |     });
50 |   });
51 | });
```

packages/nestjs-trpc/lib/decorators/__tests__/path.decorator.spec.ts
```
1 | import 'reflect-metadata';
2 | import { Path } from '../path.decorator';
3 | import { PROCEDURE_PARAM_METADATA_KEY } from '../../trpc.constants';
4 | import { ProcedureParamDecoratorType } from '../../interfaces/factory.interface';
5 | 
6 | describe('Path Decorator', () => {
7 |   class TestClass {
8 |     testMethod(@Path() param1: string, @Path() param2: string) {}
9 |   }
10 | 
11 |   it('should add metadata to the method', () => {
12 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
13 |     expect(metadata).toBeDefined();
14 |     expect(Array.isArray(metadata)).toBe(true);
15 |   });
16 | 
17 |   it('should add correct metadata for each parameter', () => {
18 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
19 |     expect(metadata).toHaveLength(2);
20 | 
21 |     expect(metadata[0]).toEqual({
22 |       type: ProcedureParamDecoratorType.Path,
23 |       index: 1,
24 |     });
25 | 
26 |     expect(metadata[1]).toEqual({
27 |       type: ProcedureParamDecoratorType.Path,
28 |       index: 0,
29 |     });
30 |   });
31 | 
32 |   it('should append to existing metadata', () => {
33 |     class TestClassWithExistingMetadata {
34 |       testMethod(@Path() param1: string) {}
35 |     }
36 | 
37 |     // Simulate existing metadata
38 |     const existingMetadata = [{ type: 'SomeOtherDecorator', index: 0 }];
39 |     Reflect.defineMetadata(PROCEDURE_PARAM_METADATA_KEY, existingMetadata, TestClassWithExistingMetadata.prototype, 'testMethod');
40 | 
41 |     // Apply our decorator
42 |     Path()(TestClassWithExistingMetadata.prototype, 'testMethod', 1);
43 | 
44 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClassWithExistingMetadata.prototype, 'testMethod');
45 |     expect(metadata).toHaveLength(2);
46 |     expect(metadata[1]).toEqual({
47 |       type: ProcedureParamDecoratorType.Path,
48 |       index: 1,
49 |     });
50 |   });
51 | });
```

packages/nestjs-trpc/lib/decorators/__tests__/query.decorator.spec.ts
```
1 | import 'reflect-metadata';
2 | import { Query } from '../query.decorator';
3 | import { PROCEDURE_METADATA_KEY, PROCEDURE_TYPE_KEY } from '../../trpc.constants';
4 | import { ProcedureType } from '../../trpc.enum';
5 | import { z } from 'zod';
6 | 
7 | describe('Query Decorator', () => {
8 |   it('should set procedure type metadata', () => {
9 |     class TestClass {
10 |       @Query()
11 |       testMethod() {}
12 |     }
13 | 
14 |     const metadata = Reflect.getMetadata(PROCEDURE_TYPE_KEY, TestClass.prototype.testMethod);
15 |     expect(metadata).toBe(ProcedureType.Query);
16 |   });
17 | 
18 |   it('should set procedure metadata with input and output schemas', () => {
19 |     const inputSchema = z.string();
20 |     const outputSchema = z.number();
21 | 
22 |     class TestClass {
23 |       @Query({ input: inputSchema, output: outputSchema })
24 |       testMethod() {}
25 |     }
26 | 
27 |     const metadata = Reflect.getMetadata(PROCEDURE_METADATA_KEY, TestClass.prototype.testMethod);
28 |     expect(metadata).toEqual({ input: inputSchema, output: outputSchema });
29 |   });
30 | 
31 |   it('should set procedure metadata without schemas', () => {
32 |     class TestClass {
33 |       @Query()
34 |       testMethod() {}
35 |     }
36 | 
37 |     const metadata = Reflect.getMetadata(PROCEDURE_METADATA_KEY, TestClass.prototype.testMethod);
38 |     expect(metadata).toBeUndefined();
39 |   });
40 | 
41 |   it('should set procedure metadata with only input schema', () => {
42 |     const inputSchema = z.string();
43 | 
44 |     class TestClass {
45 |       @Query({ input: inputSchema })
46 |       testMethod() {}
47 |     }
48 | 
49 |     const metadata = Reflect.getMetadata(PROCEDURE_METADATA_KEY, TestClass.prototype.testMethod);
50 |     expect(metadata).toEqual({ input: inputSchema });
51 |   });
52 | 
53 |   it('should set procedure metadata with only output schema', () => {
54 |     const outputSchema = z.number();
55 | 
56 |     class TestClass {
57 |       @Query({ output: outputSchema })
58 |       testMethod() {}
59 |     }
60 | 
61 |     const metadata = Reflect.getMetadata(PROCEDURE_METADATA_KEY, TestClass.prototype.testMethod);
62 |     expect(metadata).toEqual({ output: outputSchema });
63 |   });
64 | });
```

packages/nestjs-trpc/lib/decorators/__tests__/raw-input.decorator.spec.ts
```
1 | import 'reflect-metadata';
2 | import { RawInput } from '../raw-input.decorator';
3 | import { PROCEDURE_PARAM_METADATA_KEY } from '../../trpc.constants';
4 | import { ProcedureParamDecoratorType } from '../../interfaces/factory.interface';
5 | 
6 | describe('RawInput Decorator', () => {
7 |   class TestClass {
8 |     testMethod(@RawInput() param1: any, @RawInput() param2: any) {}
9 |   }
10 | 
11 |   it('should add metadata to the method', () => {
12 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
13 |     expect(metadata).toBeDefined();
14 |     expect(Array.isArray(metadata)).toBe(true);
15 |   });
16 | 
17 |   it('should add correct metadata for each parameter', () => {
18 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
19 |     expect(metadata).toHaveLength(2);
20 | 
21 |     expect(metadata[0]).toEqual({
22 |       type: ProcedureParamDecoratorType.RawInput,
23 |       index: 1,
24 |     });
25 | 
26 |     expect(metadata[1]).toEqual({
27 |       type: ProcedureParamDecoratorType.RawInput,
28 |       index: 0,
29 |     });
30 |   });
31 | 
32 |   it('should append to existing metadata', () => {
33 |     class TestClassWithExistingMetadata {
34 |       testMethod(@RawInput() param1: any) {}
35 |     }
36 | 
37 |     // Simulate existing metadata
38 |     const existingMetadata = [{ type: 'SomeOtherDecorator', index: 0 }];
39 |     Reflect.defineMetadata(PROCEDURE_PARAM_METADATA_KEY, existingMetadata, TestClassWithExistingMetadata.prototype, 'testMethod');
40 | 
41 |     // Apply our decorator
42 |     RawInput()(TestClassWithExistingMetadata.prototype, 'testMethod', 1);
43 | 
44 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClassWithExistingMetadata.prototype, 'testMethod');
45 |     expect(metadata).toHaveLength(2);
46 |     expect(metadata[1]).toEqual({
47 |       type: ProcedureParamDecoratorType.RawInput,
48 |       index: 1,
49 |     });
50 |   });
51 | });
```

packages/nestjs-trpc/lib/decorators/__tests__/router.decorator.spec.ts
```
1 | import 'reflect-metadata';
2 | import { Router } from '../router.decorator';
3 | import { ROUTER_METADATA_KEY } from '../../trpc.constants';
4 | 
5 | describe('Router Decorator', () => {
6 |   it('should set router metadata without alias', () => {
7 |     @Router()
8 |     class TestRouter {}
9 | 
10 |     const metadata = Reflect.getMetadata(ROUTER_METADATA_KEY, TestRouter);
11 |     expect(metadata).toStrictEqual({alias: undefined, path: __filename})
12 |   });
13 | 
14 |   it('should set router metadata with alias', () => {
15 |     const alias = 'testAlias';
16 | 
17 |     @Router({ alias })
18 |     class TestRouter {}
19 | 
20 |     const metadata = Reflect.getMetadata(ROUTER_METADATA_KEY, TestRouter);
21 |     expect(metadata).toStrictEqual({alias, path: __filename})
22 |   });
23 | 
24 |   it('should not affect class methods', () => {
25 |     @Router()
26 |     class TestRouter {
27 |       testMethod() {}
28 |     }
29 | 
30 |     const metadata = Reflect.getMetadata(ROUTER_METADATA_KEY, TestRouter.prototype.testMethod);
31 |     expect(metadata).toBeUndefined();
32 |   });
33 | 
34 |   it('should allow multiple routers with different aliases', () => {
35 |     @Router({ alias: 'router1' })
36 |     class TestRouter1 {}
37 | 
38 |     @Router({ alias: 'router2' })
39 |     class TestRouter2 {}
40 | 
41 |     const metadata1 = Reflect.getMetadata(ROUTER_METADATA_KEY, TestRouter1);
42 |     const metadata2 = Reflect.getMetadata(ROUTER_METADATA_KEY, TestRouter2);
43 | 
44 |     expect(metadata1).toEqual({ alias: 'router1', path: __filename });
45 |     expect(metadata2).toEqual({ alias: 'router2', path: __filename });
46 |   });
47 | });
```

packages/nestjs-trpc/lib/decorators/__tests__/type.decorator.spec.ts
```
1 | import 'reflect-metadata';
2 | import { Type } from '../type.decorator';
3 | import { PROCEDURE_PARAM_METADATA_KEY } from '../../trpc.constants';
4 | import { ProcedureParamDecoratorType } from '../../interfaces/factory.interface';
5 | 
6 | describe('Type Decorator', () => {
7 |   class TestClass {
8 |     testMethod(@Type() param1: any, @Type() param2: any) {}
9 |   }
10 | 
11 |   it('should add metadata to the method', () => {
12 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
13 |     expect(metadata).toBeDefined();
14 |     expect(Array.isArray(metadata)).toBe(true);
15 |   });
16 | 
17 |   it('should add correct metadata for each parameter', () => {
18 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClass.prototype, 'testMethod');
19 |     expect(metadata).toHaveLength(2);
20 | 
21 |     expect(metadata[0]).toEqual({
22 |       type: ProcedureParamDecoratorType.Type,
23 |       index: 1,
24 |     });
25 | 
26 |     expect(metadata[1]).toEqual({
27 |       type: ProcedureParamDecoratorType.Type,
28 |       index: 0,
29 |     });
30 |   });
31 | 
32 |   it('should append to existing metadata', () => {
33 |     class TestClassWithExistingMetadata {
34 |       testMethod(@Type() param1: any) {}
35 |     }
36 | 
37 |     // Simulate existing metadata
38 |     const existingMetadata = [{ type: 'SomeOtherDecorator', index: 0 }];
39 |     Reflect.defineMetadata(PROCEDURE_PARAM_METADATA_KEY, existingMetadata, TestClassWithExistingMetadata.prototype, 'testMethod');
40 | 
41 |     // Apply our decorator
42 |     Type()(TestClassWithExistingMetadata.prototype, 'testMethod', 1);
43 | 
44 |     const metadata = Reflect.getMetadata(PROCEDURE_PARAM_METADATA_KEY, TestClassWithExistingMetadata.prototype, 'testMethod');
45 |     expect(metadata).toHaveLength(2);
46 |     expect(metadata[1]).toEqual({
47 |       type: ProcedureParamDecoratorType.Type,
48 |       index: 1,
49 |     });
50 |   });
51 | });
```

packages/nestjs-trpc/lib/factories/__tests__/middleware.factory.spec.ts
```
1 | import { Test, TestingModule } from '@nestjs/testing';
2 | import { MiddlewareFactory } from '../middleware.factory';
3 | import { RouterFactory } from '../router.factory';
4 | import { ProcedureFactory } from '../procedure.factory';
5 | 
6 | describe('MiddlewareFactory', () => {
7 |   let middlewareFactory: MiddlewareFactory;
8 |   let routerFactory: RouterFactory;
9 |   let procedureFactory: ProcedureFactory;
10 | 
11 |   beforeEach(async () => {
12 |     const module: TestingModule = await Test.createTestingModule({
13 |       providers: [
14 |         MiddlewareFactory,
15 |         {
16 |           provide: RouterFactory,
17 |           useValue: {
18 |             getRouters: jest.fn(),
19 |           },
20 |         },
21 |         {
22 |           provide: ProcedureFactory,
23 |           useValue: {
24 |             getProcedures: jest.fn(),
25 |           },
26 |         },
27 |       ],
28 |     }).compile();
29 | 
30 |     middlewareFactory = module.get<MiddlewareFactory>(MiddlewareFactory);
31 |     routerFactory = module.get<RouterFactory>(RouterFactory);
32 |     procedureFactory = module.get<ProcedureFactory>(ProcedureFactory);
33 |   });
34 | 
35 |   it('should be defined', () => {
36 |     expect(middlewareFactory).toBeDefined();
37 |   });
38 | 
39 |   describe('getMiddlewares', () => {
40 |     it('should return unique middlewares', () => {
41 |       const mockRouter = { instance: {}, prototype: {}, middlewares: [] };
42 |       const mockProcedure = { middlewares: [class TestMiddleware {}] };
43 |       
44 |       (routerFactory.getRouters as jest.Mock).mockReturnValue([mockRouter]);
45 |       (procedureFactory.getProcedures as jest.Mock).mockReturnValue([mockProcedure]);
46 | 
47 |       const result = middlewareFactory.getMiddlewares();
48 | 
49 |       expect(result).toHaveLength(1);
50 |       expect(result[0]).toStrictEqual({"instance": mockProcedure.middlewares[0], "path": undefined });
51 |     });
52 | 
53 |     it('should handle procedures without middlewares', () => {
54 |       const mockRouter = { instance: {}, prototype: {}, middlewares: []  };
55 |       const mockProcedure = { middlewares: undefined };
56 |       
57 |       (routerFactory.getRouters as jest.Mock).mockReturnValue([mockRouter]);
58 |       (procedureFactory.getProcedures as jest.Mock).mockReturnValue([mockProcedure]);
59 | 
60 |       const result = middlewareFactory.getMiddlewares();
61 | 
62 |       expect(result).toHaveLength(0);
63 |     });
64 |   });
65 | });
```

packages/nestjs-trpc/lib/factories/__tests__/procedure.factory.spec.ts
```
1 | import { Test, TestingModule } from '@nestjs/testing';
2 | import { ProcedureFactory } from '../procedure.factory';
3 | import { ConsoleLogger } from '@nestjs/common';
4 | import { MetadataScanner, ModuleRef } from '@nestjs/core';
5 | import { z } from 'zod';
6 | import { ProcedureBuilder, TRPCError, initTRPC } from '@trpc/server';
7 | import { ProcedureFactoryMetadata, ProcedureParamDecoratorType } from '../../interfaces/factory.interface';
8 | import { TRPCMiddleware } from '../../interfaces';
9 | import { Ctx, Input, UseMiddlewares, Options, Query } from '../../decorators';
10 | import { ProcedureType } from '../../trpc.enum';
11 | 
12 | describe('ProcedureFactory', () => {
13 |   let procedureFactory: ProcedureFactory;
14 |   let metadataScanner: jest.Mocked<MetadataScanner>
15 |   let moduleRef: ModuleRef;
16 | 
17 |   beforeEach(async () => {
18 |     const module: TestingModule = await Test.createTestingModule({
19 |       providers: [
20 |         ProcedureFactory,
21 |         {
22 |           provide: ConsoleLogger,
23 |           useValue: {
24 |             log: jest.fn(),
25 |           },
26 |         },
27 |         {
28 |           provide: MetadataScanner,
29 |           useValue: {
30 |             getAllMethodNames: jest.fn(),
31 |           },
32 |         },
33 |         {
34 |           provide: ModuleRef,
35 |           useValue: {
36 |             get: jest.fn(),
37 |           },
38 |         },
39 |       ],
40 |     }).compile();
41 | 
42 |     procedureFactory = module.get<ProcedureFactory>(ProcedureFactory);
43 |     metadataScanner = module.get(MetadataScanner);
44 |     moduleRef = module.get<ModuleRef>(ModuleRef);
45 |   });
46 | 
47 |   describe('getProcedures', () => {
48 |     it('should return procedures', () => {
49 |       const userSchema = z.object({
50 |         id: z.string(),
51 |         name: z.string(),
52 |       });
53 | 
54 |       class UserService {
55 |         async getUser(userId: string) {
56 |           return { id: userId, name: 'Test User' };
57 |         }
58 |       }
59 | 
60 |       class ProtectedMiddleware implements TRPCMiddleware {
61 |         use(opts: any) {
62 |           return opts;
63 |         }
64 |       }
65 | 
66 | 
67 |       class UserRouter {
68 |         constructor(private readonly userService: UserService) {}
69 | 
70 |         @Query({
71 |           input: z.object({ userId: z.string() }),
72 |           output: userSchema
73 |         })
74 |         @UseMiddlewares(ProtectedMiddleware)
75 |         async getUserById(@Input("userId") userId: string, @Ctx() ctx: any, @Options() opts: any): Promise<any> {
76 |           const user = await this.userService.getUser(userId);
77 |           if (ctx.ben) {
78 |             throw new TRPCError({
79 |               message: 'Could not find user.',
80 |               code: 'NOT_FOUND',
81 |             });
82 |           }
83 |           return user;
84 |         }
85 |       }
86 | 
87 |       const mockInstance = new UserRouter(new UserService());
88 |       const mockPrototype = Object.getPrototypeOf(mockInstance);
89 | 
90 |       metadataScanner.getAllMethodNames.mockImplementation(
91 |         (prototype: object | null) => {
92 |           return ['getUserById'];
93 |         }
94 |       );
95 | 
96 |       const result = procedureFactory.getProcedures(mockInstance, mockPrototype);
97 | 
98 |       expect(result).toHaveLength(1);
99 |       expect(result[0]).toMatchObject({
100 |         name: 'getUserById',
101 |         type: ProcedureType.Query,
102 |         input: expect.any(Object),
103 |         output: expect.any(Object),
104 |         middlewares: [ProtectedMiddleware],
105 |         params: [
106 |           { type: 'options', index: 2 },
107 |           { type: 'ctx', index: 1 },
108 |           { type: 'input', index: 0, key: 'userId' },
109 |         ],
110 |       });
111 |     });
112 |   });
113 | 
114 |   describe('serializeProcedures', () => {
115 |     it('should serialize procedures into a trpc procedure', () => {
116 |       const userSchema = z.object({
117 |         id: z.string(),
118 |         name: z.string(),
119 |       });
120 | 
121 |       class ProtectedMiddleware implements TRPCMiddleware {
122 |         use(opts: any) {
123 |           return opts;
124 |         }
125 |       }
126 | 
127 |       const mockProcedures: Array<ProcedureFactoryMetadata> = [
128 |         {
129 |           input: z.object({ userId: z.string() }),
130 |           output: userSchema,
131 |           type: 'query',
132 |           middlewares: [ProtectedMiddleware],
133 |           name: 'getUserById',
134 |           implementation: jest.fn(),
135 |           params: [
136 |             { type: ProcedureParamDecoratorType.Input, index: 0, key: 'userId' },
137 |             { type:  ProcedureParamDecoratorType.Ctx, index: 1 },
138 |             { type:  ProcedureParamDecoratorType.Options, index: 2 },
139 |           ],
140 |         },
141 |       ];
142 | 
143 |       const mockInstance = { 
144 |         constructor: class UserRouter {},
145 |         getUserById: jest.fn(),
146 |       };
147 | 
148 |       const t = initTRPC.context().create();
149 |       const mockProcedureBuilder: ProcedureBuilder<any> = t.procedure;
150 |       
151 |       (moduleRef.get as jest.Mock).mockReturnValue(mockInstance);
152 | 
153 |       const result = procedureFactory.serializeProcedures(
154 |         mockProcedures,
155 |         mockInstance,
156 |         'users',
157 |         mockProcedureBuilder,
158 |         []
159 |       );
160 | 
161 |       expect(result).toHaveProperty('getUserById');
162 |       
163 |       expect(typeof result.getUserById).toBe('function');
164 |       expect(result.getUserById._def).toBeDefined();
165 |       expect(result.getUserById._def.inputs).toBeDefined();
166 |       expect(result.getUserById._def.output).toBeDefined();
167 |       
168 |       expect(result.getUserById._def.inputs[0]).toEqual(mockProcedures[0].input);
169 |       expect(result.getUserById._def.output).toEqual(mockProcedures[0].output);
170 | 
171 |       // The middleware number here is 3 and not 1 because we append the input and output middlewares before the `ProtectedMiddleware`.
172 |       expect(result.getUserById._def.middlewares.length).toBe(3);
173 | 
174 |       expect(result.getUserById._def.query).toBeDefined();
175 |     });
176 |   });
177 | });
```

packages/nestjs-trpc/lib/factories/__tests__/router.factory.spec.ts
```
1 | import { Test, TestingModule } from '@nestjs/testing';
2 | import { RouterFactory } from '../router.factory';
3 | import { ConsoleLogger } from '@nestjs/common';
4 | import { ModulesContainer } from '@nestjs/core';
5 | import { ProcedureFactory } from '../procedure.factory';
6 | import { ROUTER_METADATA_KEY, MIDDLEWARES_KEY, PROCEDURE_TYPE_KEY, PROCEDURE_METADATA_KEY } from '../../trpc.constants';
7 | import { z } from 'zod';
8 | import { initTRPC, TRPCError } from '@trpc/server';
9 | import { TRPCMiddleware } from '../../interfaces';
10 | 
11 | const { router, procedure } = initTRPC.context().create();
12 | 
13 | describe('RouterFactory', () => {
14 |   let routerFactory: RouterFactory;
15 |   let modulesContainer: ModulesContainer;
16 |   let procedureFactory: ProcedureFactory;
17 | 
18 |   beforeEach(async () => {
19 | 
20 |     const module: TestingModule = await Test.createTestingModule({
21 |       providers: [
22 |         RouterFactory,
23 |         {
24 |           provide: ConsoleLogger,
25 |           useValue: {
26 |             log: jest.fn(),
27 |           },
28 |         },
29 |         {
30 |           provide: ModulesContainer,
31 |           useValue: new Map(),
32 |         },
33 |         {
34 |           provide: ProcedureFactory,
35 |           useValue: {
36 |             getProcedures: jest.fn(),
37 |             serializeProcedures: jest.fn(),
38 |           },
39 |         },
40 |       ],
41 |     }).compile();
42 | 
43 |     routerFactory = module.get<RouterFactory>(RouterFactory);
44 |     modulesContainer = module.get<ModulesContainer>(ModulesContainer);
45 |     procedureFactory = module.get<ProcedureFactory>(ProcedureFactory);
46 |   });
47 | 
48 |   describe('getRouters', () => {
49 |     it('should return an empty array if no routers are present', ()=> {
50 |       const result = routerFactory.getRouters();
51 |       expect(result).toHaveLength(0);
52 |     });
53 |     it('should return routers with correct metadata', () => {
54 |       const userSchema = z.object({
55 |         id: z.string(),
56 |         name: z.string(),
57 |       });
58 | 
59 |       class UserService {
60 |         async getUser(userId: string) {
61 |           return { id: userId, name: 'Test User' };
62 |         }
63 |       }
64 | 
65 |       class ProtectedMiddleware implements TRPCMiddleware {
66 |         use(opts: any) {
67 |           return opts;
68 |         }
69 |       }
70 | 
71 |       @Reflect.metadata(ROUTER_METADATA_KEY, { alias: 'users' })
72 |       class UserRouter {
73 |         constructor(private readonly userService: UserService) {}
74 | 
75 |         @Reflect.metadata(PROCEDURE_TYPE_KEY, 'query')
76 |         @Reflect.metadata(PROCEDURE_METADATA_KEY, {
77 |           input: z.object({ userId: z.string() }),
78 |           output: userSchema,
79 |         })
80 |         @Reflect.metadata(MIDDLEWARES_KEY, ProtectedMiddleware)
81 |         async getUserById(userId: string, ctx: any, _opts: any): Promise<any> {
82 |           const user = await this.userService.getUser(userId);
83 |           if (ctx.ben) {
84 |             throw new TRPCError({
85 |               message: 'Could not find user.',
86 |               code: 'NOT_FOUND',
87 |             });
88 |           }
89 |           return user;
90 |         }
91 |       }
92 | 
93 |       class MockTestService {}
94 | 
95 |       // Create an instance of the router
96 |       const userRouterInstance = new UserRouter(new UserService());
97 |       const mockServiceInstance = new MockTestService();
98 | 
99 |       const mockModule = {
100 |         providers: new Map([
101 |           ['UserRouter', { 
102 |             name: 'UserRouter',
103 |             instance: userRouterInstance,
104 |             isResolved: true
105 |           }],
106 |           ['MockService', { 
107 |             name: 'MockService',
108 |             instance: mockServiceInstance,
109 |             isResolved: true
110 |           }]
111 |         ])
112 |       };
113 |       modulesContainer.set('TestModule', mockModule as any);
114 | 
115 |       const result = routerFactory.getRouters();
116 | 
117 |       expect(result).toHaveLength(1);
118 |       expect(result[0]).toEqual({
119 |         name: 'UserRouter',
120 |         instance: userRouterInstance,
121 |         alias: 'users',
122 |         middlewares: [],
123 |         path: undefined,
124 |       });
125 |     });
126 |   });
127 | 
128 |   describe('serializeRoutes', () => {
129 |     it('should serialize routes with procedures', () => {
130 |       // Setup mock data
131 |       const userSchema = z.object({
132 |         id: z.string(),
133 |         name: z.string(),
134 |       });
135 | 
136 |       class UserService {
137 |         async getUser(userId: string) {
138 |           return { id: userId, name: 'Test User' };
139 |         }
140 |       }
141 | 
142 |       class ProtectedMiddleware implements TRPCMiddleware {
143 |         use(opts: any) {
144 |           return opts;
145 |         }
146 |       }
147 | 
148 |       @Reflect.metadata(ROUTER_METADATA_KEY, { alias: 'users' })
149 |       class UserRouter {
150 |         constructor(private readonly userService: UserService) {}
151 | 
152 |         async getUserById(userId: string, ctx: any, _opts: any): Promise<any> {
153 |           const user = await this.userService.getUser(userId);
154 |           if (ctx.ben) {
155 |             throw new TRPCError({
156 |               message: 'Could not find user.',
157 |               code: 'NOT_FOUND',
158 |             });
159 |           }
160 |           return user;
161 |         }
162 |       }
163 | 
164 |       const userRouterInstance = new UserRouter(new UserService());
165 | 
166 |       // Setup ModulesContainer
167 |       const mockModule = {
168 |         providers: new Map([
169 |           ['UserRouter', { 
170 |             name: 'UserRouter',
171 |             instance: userRouterInstance,
172 |             isResolved: true
173 |           }]
174 |         ])
175 |       };
176 |       modulesContainer.set('TestModule', mockModule as any);
177 | 
178 |       // Mock getProcedures
179 |       const mockProcedures = [{
180 |         input: z.object({ userId: z.string() }),
181 |         output: userSchema,
182 |         type: 'query',
183 |         name: 'getUserById',
184 |         implementation: UserRouter.prototype.getUserById,
185 |         params: [
186 |           { type: 'input', index: 0, key: 'userId' },
187 |           { type: 'context', index: 1 },
188 |           { type: 'options', index: 2 },
189 |         ],
190 |         middlewares: ProtectedMiddleware,
191 |       }];
192 |       (procedureFactory.getProcedures as jest.Mock).mockReturnValue(mockProcedures);
193 | 
194 |       // Mock serializeProcedures
195 |       (procedureFactory.serializeProcedures as jest.Mock).mockReturnValue({
196 |         getUserById: procedure.query(() => { return "mock" }),
197 |       });
198 | 
199 |       // Mock procedure builder
200 |       const mockProcedureBuilder = {
201 |         input: jest.fn().mockReturnThis(),
202 |         output: jest.fn().mockReturnThis(),
203 |         query: jest.fn().mockReturnThis(),
204 |         use: jest.fn().mockReturnThis(),
205 |       } as any;
206 | 
207 |       // Call serializeRoutes
208 |       const result = routerFactory.serializeRoutes(router, mockProcedureBuilder);
209 | 
210 |       // Assertions
211 |       expect(result).toHaveProperty('users');
212 |       expect(result.users).toHaveProperty('getUserById');
213 |       expect(procedureFactory.serializeProcedures).toHaveBeenCalledWith(
214 |         mockProcedures,
215 |         userRouterInstance,
216 |         'users',
217 |         mockProcedureBuilder,
218 |         []
219 |       );
220 |     });
221 |   });
222 | });
```

packages/nestjs-trpc/lib/factories/__tests__/trpc.factory.spec.ts
```
1 | import { Test, TestingModule } from '@nestjs/testing';
2 | import { TRPCFactory } from '../trpc.factory';
3 | import { TRPCGenerator } from '../../generators/trpc.generator';
4 | import { RouterFactory } from '../router.factory';
5 | import { ProcedureFactory } from '../procedure.factory';
6 | 
7 | describe('TRPCFactory', () => {
8 |   let trpcFactory: TRPCFactory;
9 |   let routerFactory: RouterFactory;
10 | 
11 |   beforeEach(async () => {
12 |     const module: TestingModule = await Test.createTestingModule({
13 |       providers: [
14 |         TRPCFactory,
15 |         {
16 |           provide: TRPCGenerator,
17 |           useValue: {},
18 |         },
19 |         {
20 |           provide: RouterFactory,
21 |           useValue: {
22 |             serializeRoutes: jest.fn(),
23 |           },
24 |         },
25 |         {
26 |           provide: ProcedureFactory,
27 |           useValue: {},
28 |         },
29 |       ],
30 |     }).compile();
31 | 
32 |     trpcFactory = module.get<TRPCFactory>(TRPCFactory);
33 |     routerFactory = module.get<RouterFactory>(RouterFactory);
34 |   });
35 | 
36 |   it('should be defined', () => {
37 |     expect(trpcFactory).toBeDefined();
38 |   });
39 | });
```

packages/nestjs-trpc/lib/generators/__tests__/context.generator.spec.ts
```
1 | import { Test, TestingModule } from '@nestjs/testing';
2 | import { ContextGenerator } from '../context.generator';
3 | import { Project, SourceFile } from 'ts-morph';
4 | import { TRPCContext } from '../../interfaces';
5 | 
6 | describe('ContextGenerator', () => {
7 |   let contextGenerator: ContextGenerator;
8 |   let project: Project;
9 |   let sourceFile: SourceFile;
10 | 
11 |   beforeEach(async () => {
12 |     const module: TestingModule = await Test.createTestingModule({
13 |       providers: [ContextGenerator],
14 |     }).compile();
15 | 
16 |     contextGenerator = module.get<ContextGenerator>(ContextGenerator);
17 |     project = new Project();
18 |     
19 |     sourceFile = project.createSourceFile(
20 |       "test.ts",
21 |       `
22 |       import { TRPCContext } from './interfaces';
23 | 
24 |       export class TestContext implements TRPCContext {
25 |         create() {
26 |           return { user: { id: '1', name: 'Test' } };
27 |         }
28 |       }
29 |       `, { overwrite: true }
30 |     );
31 |   });
32 | 
33 |   it('should be defined', () => {
34 |     expect(contextGenerator).toBeDefined();
35 |   });
36 | 
37 |   describe('getContextInterface', () => {
38 | 
39 |     it('should return the context interface if everything is valid', async () => {
40 |       class TestContext implements TRPCContext {
41 |         create() {
42 |           return { user: { id: '1', name: 'Test' } };
43 |         }
44 |       }
45 | 
46 |       jest.spyOn(project, 'addSourceFileAtPath').mockReturnValue(sourceFile);
47 | 
48 |       const result = await contextGenerator.getContextInterface(sourceFile, TestContext);
49 |       expect(result).toBe('{ user: { id: string; name: string; }; }');
50 |     });
51 | 
52 |     it('should return null if create method is not found', async () => {
53 |       sourceFile = project.createSourceFile(
54 |         "test.ts",
55 |         `
56 |         export class InvalidContext {
57 |           // No create method
58 |         }
59 |         `, { overwrite: true }
60 |       );
61 | 
62 |       class InvalidContext {}
63 | 
64 |       jest.spyOn(project, 'addSourceFileAtPath').mockReturnValue(sourceFile);
65 | 
66 |       //@ts-expect-error invalid context passed in
67 |       const result = await contextGenerator.getContextInterface(sourceFile, InvalidContext);
68 |       expect(result).toBeNull();
69 |     });
70 |   });
71 | });
```

packages/nestjs-trpc/lib/generators/__tests__/decorator.generator.spec.ts
```
1 | import { Test, TestingModule } from '@nestjs/testing';
2 | import { DecoratorGenerator } from '../decorator.generator';
3 | import { ConsoleLogger } from '@nestjs/common';
4 | import { Project, SourceFile } from 'ts-morph';
5 | import { ProcedureGenerator } from '../procedure.generator';
6 | 
7 | describe('DecoratorGenerator', () => {
8 |   let decoratorGenerator: DecoratorGenerator;
9 |   let consoleLogger: jest.Mocked<ConsoleLogger>;
10 |   let project: Project;
11 |   let sourceFile: SourceFile;
12 | 
13 |   beforeEach(async () => {
14 |     project = new Project();
15 |     sourceFile = project.createSourceFile("test.ts", `
16 |       import { Query, Mutation, UseMiddlewares } from '@nestjs/common';
17 |       
18 |       class TestClass {
19 |         @Query()
20 |         queryMethod() {}
21 | 
22 |         @Mutation()
23 |         mutationMethod() {}
24 | 
25 |         @UseMiddlewares()
26 |         middlewareMethod() {}
27 | 
28 |         @UnsupportedDecorator()
29 |         unsupportedMethod() {}
30 |       }
31 |     `, {overwrite: true});
32 | 
33 |     const module: TestingModule = await Test.createTestingModule({
34 |       providers: [
35 |         DecoratorGenerator,
36 |         {
37 |           provide: ConsoleLogger,
38 |           useValue: {
39 |             warn: jest.fn(),
40 |           },
41 |         },
42 |         {
43 |           provide: ProcedureGenerator,
44 |           useValue: {
45 |             warn: jest.fn(),
46 |           },
47 |         },
48 |       ],
49 |     }).compile();
50 | 
51 |     decoratorGenerator = module.get<DecoratorGenerator>(DecoratorGenerator);
52 |     consoleLogger = module.get(ConsoleLogger);
53 |   });
54 | 
55 |   it('should be defined', () => {
56 |     expect(decoratorGenerator).toBeDefined();
57 |   });
58 | 
59 |   describe('serializeProcedureDecorators', () => {
60 |     it('should serialize Query decorator', () => {
61 |       const queryMethod = sourceFile.getClass('TestClass')!.getMethod('queryMethod')!;
62 |       const queryDecorator = queryMethod.getDecorator('Query')!;
63 | 
64 |       const result = decoratorGenerator.serializeProcedureDecorators(
65 |         [queryDecorator],
66 |         sourceFile,
67 |         project
68 |       );
69 | 
70 |       expect(result).toEqual([{ name: 'Query', arguments: {} }]);
71 |     });
72 | 
73 |     it('should serialize Mutation decorator', () => {
74 |       const mutationMethod = sourceFile.getClass('TestClass')!.getMethod('mutationMethod')!;
75 |       const mutationDecorator = mutationMethod.getDecorator('Mutation')!;
76 | 
77 |       const result = decoratorGenerator.serializeProcedureDecorators(
78 |         [mutationDecorator],
79 |         sourceFile,
80 |         project
81 |       );
82 | 
83 |       expect(result).toEqual([{ name: 'Mutation', arguments: {} }]);
84 |     });
85 | 
86 |     it('should ignore UseMiddlewares decorator', () => {
87 |       const middlewareMethod = sourceFile.getClass('TestClass')!.getMethod('middlewareMethod')!;
88 |       const middlewaresDecorator = middlewareMethod.getDecorator('UseMiddlewares')!;
89 | 
90 |       const result = decoratorGenerator.serializeProcedureDecorators(
91 |         [middlewaresDecorator],
92 |         sourceFile,
93 |         project
94 |       );
95 | 
96 |       expect(result).toEqual([]);
97 |     });
98 | 
99 |     it('should warn about unsupported decorators', () => {
100 |       const unsupportedMethod = sourceFile.getClass('TestClass')!.getMethod('unsupportedMethod')!;
101 |       const unsupportedDecorator = unsupportedMethod.getDecorator('UnsupportedDecorator')!;
102 | 
103 |       decoratorGenerator.serializeProcedureDecorators(
104 |         [unsupportedDecorator],
105 |         sourceFile,
106 |         project
107 |       );
108 | 
109 |       expect(consoleLogger.warn).toHaveBeenCalledWith('Decorator UnsupportedDecorator, not supported.');
110 |     });
111 |   });
112 | });
```

packages/nestjs-trpc/lib/generators/__tests__/middleware.generator.spec.ts
```
1 | import { Test, TestingModule } from '@nestjs/testing';
2 | import { MiddlewareGenerator } from '../middleware.generator';
3 | import { Project, SourceFile } from 'ts-morph';
4 | import { TRPCMiddleware } from '../../interfaces';
5 | 
6 | describe('MiddlewareGenerator', () => {
7 |   let middlewareGenerator: MiddlewareGenerator;
8 |   let project: Project;
9 |   let sourceFile: SourceFile;
10 | 
11 |   beforeEach(async () => {
12 |     const module: TestingModule = await Test.createTestingModule({
13 |       providers: [MiddlewareGenerator],
14 |     }).compile();
15 | 
16 |     middlewareGenerator = module.get<MiddlewareGenerator>(MiddlewareGenerator);
17 |     project = new Project();
18 |     
19 |     sourceFile = project.createSourceFile(
20 |       "test.ts",
21 |       `
22 |       import { TRPCMiddleware } from './interfaces';
23 | 
24 |       export class TestMiddleware implements TRPCMiddleware {
25 |         use(opts: any) {
26 |           return opts.next({
27 |             ctx: {
28 |               user: { id: '1', name: 'Test' },
29 |             },
30 |           });
31 |         }
32 |       }
33 |       `,
34 |       { overwrite: true }
35 |     );
36 |   });
37 | 
38 |   it('should be defined', () => {
39 |     expect(middlewareGenerator).toBeDefined();
40 |   });
41 | 
42 |   describe('getMiddlewareInterface', () => {
43 |     it('should return null if middleware class name is not defined', async () => {
44 |       const result = await middlewareGenerator.getMiddlewareInterface('routerPath', {} as any, project);
45 |       expect(result).toBeNull();
46 |     });
47 | 
48 |     it('should return the middleware interface if everything is valid', async () => {
49 |       class TestMiddleware implements TRPCMiddleware {
50 |         use(opts: any) {
51 |           return opts.next({
52 |             ctx: {
53 |               user: { id: '1', name: 'Test' },
54 |             },
55 |           });
56 |         }
57 |       }
58 | 
59 |       jest.spyOn(project, 'addSourceFileAtPath').mockReturnValue(sourceFile);
60 | 
61 |       const result = await middlewareGenerator.getMiddlewareInterface('routerPath', TestMiddleware, project);
62 |       expect(result).toEqual({
63 |         name: 'TestMiddleware',
64 |         properties: [
65 |           { name: 'user', type: '{ id: string; name: string; }' },
66 |         ],
67 |       });
68 |     });
69 |   });
70 | });
```

packages/nestjs-trpc/lib/generators/__tests__/procedure.generator.spec.ts
```
1 | import { Test, TestingModule } from '@nestjs/testing';
2 | import { Project } from 'ts-morph';
3 | import {
4 |   ProcedureGeneratorMetadata,
5 | } from '../../interfaces/generator.interface';
6 | import { ProcedureGenerator } from '../procedure.generator';
7 | import { ImportsScanner } from '../../scanners/imports.scanner';
8 | import { StaticGenerator } from '../static.generator';
9 | import { TYPESCRIPT_APP_ROUTER_SOURCE_FILE } from '../generator.constants';
10 | 
11 | describe('ProcedureGenerator', () => {
12 |   let procedureGenerator: ProcedureGenerator;
13 |   let project: Project;
14 | 
15 |   beforeEach(async () => {
16 |     const module: TestingModule = await Test.createTestingModule({
17 |       providers: [
18 |         ProcedureGenerator,
19 |         {
20 |           provide: ImportsScanner,
21 |           useValue: jest.fn(),
22 |         },
23 |         {
24 |           provide: StaticGenerator,
25 |           useValue: jest.fn(),
26 |         },
27 |         {
28 |           provide: TYPESCRIPT_APP_ROUTER_SOURCE_FILE,
29 |           useValue: jest.fn(),
30 |         },
31 |       ],
32 |     }).compile();
33 | 
34 |     procedureGenerator = module.get<ProcedureGenerator>(ProcedureGenerator);
35 |   });
36 | 
37 |   it('should be defined', () => {
38 |     expect(procedureGenerator).toBeDefined();
39 |   });
40 | 
41 |   describe('generateRoutersStringFromMetadata', () => {
42 |     describe('for a query', () => {
43 |       it('should generate router string from metadata', () => {
44 |         const mockProcedure: ProcedureGeneratorMetadata = {
45 |           name: 'testQuery',
46 |           decorators: [{ name: 'Query', arguments: {} }],
47 |         }
48 | 
49 |         const result = procedureGenerator.generateProcedureString(mockProcedure);
50 | 
51 |         expect(result).toBe(
52 |           'testQuery: publicProcedure.query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any )'
53 |         );
54 |       });
55 |     })
56 | 
57 |     describe('for a mutation', () => {
58 |       it('should generate router string from metadata', () => {
59 |         const mockProcedure: ProcedureGeneratorMetadata = {
60 |           name: 'testMutation',
61 |           decorators: [{ name: 'Mutation', arguments: {} }],
62 |         }
63 | 
64 |         const result = procedureGenerator.generateProcedureString(mockProcedure);
65 | 
66 |         expect(result).toBe(
67 |           'testMutation: publicProcedure.mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any )'
68 |         );
69 |       });
70 |     })
71 |   });
72 | });
```

packages/nestjs-trpc/lib/generators/__tests__/router.generator.spec.ts
```
1 | import { Test, TestingModule } from '@nestjs/testing';
2 | import { RouterGenerator } from '../router.generator';
3 | import { DecoratorGenerator } from '../decorator.generator';
4 | import { Project, SourceFile } from 'ts-morph';
5 | import { RoutersFactoryMetadata, } from '../../interfaces/factory.interface';
6 | import {
7 |   DecoratorGeneratorMetadata,
8 |   ProcedureGeneratorMetadata,
9 |   RouterGeneratorMetadata,
10 | } from '../../interfaces/generator.interface';
11 | import { Query, Mutation } from '../../decorators';
12 | import { z } from 'zod';
13 | import { ProcedureGenerator } from '../procedure.generator';
14 | 
15 | describe('RouterGenerator', () => {
16 |   let routerGenerator: RouterGenerator;
17 |   let decoratorGenerator: jest.Mocked<DecoratorGenerator>;
18 |   let procedureGenerator: jest.Mocked<ProcedureGenerator>;
19 |   let project: Project;
20 |   let sourceFile: SourceFile;
21 | 
22 |   beforeEach(async () => {
23 |     const module: TestingModule = await Test.createTestingModule({
24 |       providers: [
25 |         RouterGenerator,
26 |         {
27 |           provide: DecoratorGenerator,
28 |           useValue: {
29 |             serializeProcedureDecorators: jest.fn(),
30 |           },
31 |         },
32 |         {
33 |           provide: ProcedureGenerator,
34 |           useValue: {
35 |             generateProcedureString: jest.fn(),
36 |           },
37 |         },
38 |       ],
39 |     }).compile();
40 | 
41 |     routerGenerator = module.get<RouterGenerator>(RouterGenerator);
42 |     decoratorGenerator = module.get(DecoratorGenerator);
43 |     procedureGenerator = module.get(ProcedureGenerator);
44 |     project = new Project();
45 |     
46 |     sourceFile = project.createSourceFile(
47 |       "test.ts",
48 |       `
49 |       import { Query, Mutation } from '../../decorators';
50 |       import { z } from 'zod';
51 | 
52 |       export class TestRouter {
53 |         @Query()
54 |         testQuery() {
55 |           return 'test query';
56 |         }
57 | 
58 |         @Mutation()
59 |         testMutation() {
60 |           return 'test mutation';
61 |         }
62 |       }
63 |       `, { overwrite: true }
64 |     );
65 |   });
66 | 
67 |   it('should be defined', () => {
68 |     expect(routerGenerator).toBeDefined();
69 |   });
70 | 
71 |   describe('serializeRouters', () => {
72 |     it('should serialize routers', async () => {
73 |       class TestRouter {
74 |         @Query()
75 |         testQuery() {
76 |           return 'test query';
77 |         }
78 | 
79 |         @Mutation()
80 |         testMutation() {
81 |           return 'test mutation';
82 |         }
83 |       }
84 | 
85 |       const mockRouter: RoutersFactoryMetadata = {
86 |         name: 'TestRouter',
87 |         alias: 'test',
88 |         path: 'testPath',
89 |         instance: {
90 |             name: "TestRouter",
91 |             instance: jest.fn(),
92 |             alias: 'test',
93 |             path:"testPath",
94 |             middlewares: []
95 |         },
96 |         procedures: [
97 |           {
98 |             name: 'testQuery',
99 |             implementation: TestRouter.prototype.testQuery,
100 |             type: 'query',
101 |             input: z.string(),
102 |             output: z.string(),
103 |             params: [],
104 |             middlewares: [],
105 |           },
106 |           {
107 |             name: 'testMutation',
108 |             implementation: TestRouter.prototype.testMutation,
109 |             type: 'mutation',
110 |             input: z.string(),
111 |             output: z.string(),
112 |             params: [],
113 |             middlewares: [],
114 |           },
115 |         ]
116 |       };
117 | 
118 |       const mockTestQueryDecoratorMetadata: DecoratorGeneratorMetadata[] = [
119 |           { name: 'Query', arguments: {} }
120 |       ];
121 |       const mockTestMutationDecoratorMetadata: DecoratorGeneratorMetadata[] = [
122 |           { name: 'Mutation', arguments: {} },
123 |       ];
124 | 
125 |       decoratorGenerator.serializeProcedureDecorators.mockReturnValueOnce(mockTestQueryDecoratorMetadata).mockReturnValue(mockTestMutationDecoratorMetadata);
126 |       
127 |       jest.spyOn(project, 'addSourceFileAtPath').mockReturnValue(sourceFile);
128 | 
129 |       const result = await routerGenerator.serializeRouters([mockRouter], project)
130 | 
131 |       expect(result).toEqual<Array<RouterGeneratorMetadata>>([
132 |         {
133 |           name: 'TestRouter',
134 |           alias: 'test',
135 |           procedures: [
136 |             {
137 |               name: 'testQuery',
138 |               decorators: [{ name: 'Query', arguments: {} }],
139 |             },
140 |             {
141 |               name: 'testMutation',
142 |               decorators: [{ name: 'Mutation', arguments: {} }],
143 |             },
144 |           ],
145 |         },
146 |       ]);
147 |     });
148 |   });
149 | 
150 |   describe('generateRoutersStringFromMetadata', () => {
151 |     it('should generate router string from metadata', () => {
152 |         const mockRouterMetadata: Array<RouterGeneratorMetadata> = [
153 |         {
154 |           name: 'TestRouter',
155 |           alias: 'test',
156 |           procedures: [
157 |             {
158 |               name: 'testQuery',
159 |               decorators: [{ name: 'Query', arguments: {} }],
160 |             },
161 |             {
162 |               name: 'testMutation',
163 |               decorators: [{ name: 'Mutation', arguments: {} }],
164 |             },
165 |           ],
166 |         },
167 |       ];
168 | 
169 |       procedureGenerator.generateProcedureString.mockReturnValueOnce('testQuery: publicProcedure.query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any )');
170 |       procedureGenerator.generateProcedureString.mockReturnValueOnce('testMutation: publicProcedure.mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any )');
171 | 
172 |       const result = routerGenerator.generateRoutersStringFromMetadata(mockRouterMetadata);
173 | 
174 |       expect(result).toBe(
175 |         'test: t.router({ ' +
176 |         'testQuery: publicProcedure.query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any ),\n' +
177 |         'testMutation: publicProcedure.mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any ) ' +
178 |         '})'
179 |       );
180 |     });
181 |   });
182 | });
```

packages/nestjs-trpc/lib/generators/__tests__/trpc.generator.spec.ts
```
1 | import { Test, TestingModule } from '@nestjs/testing';
2 | import { TRPCGenerator } from '../trpc.generator';
3 | import { ConsoleLogger } from '@nestjs/common';
4 | import { RouterGenerator } from '../router.generator';
5 | import { MiddlewareGenerator } from '../middleware.generator';
6 | import { ContextGenerator } from '../context.generator';
7 | import { RouterFactory } from '../../factories/router.factory';
8 | import { MiddlewareFactory } from '../../factories/middleware.factory';
9 | import { ProcedureFactory } from '../../factories/procedure.factory';
10 | import { ClassDeclaration, Project, SourceFile } from 'ts-morph';
11 | import * as fileUtil from '../../utils/ts-morph.util';
12 | import { ProcedureFactoryMetadata } from '../../interfaces/factory.interface';
13 | import { MiddlewareOptions, MiddlewareResponse, TRPCContext, TRPCMiddleware } from '../../interfaces';
14 | import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
15 | import { TRPC_GENERATOR_OPTIONS, TRPC_MODULE_CALLER_FILE_PATH } from '../../trpc.constants';
16 | import { TYPESCRIPT_APP_ROUTER_SOURCE_FILE, TYPESCRIPT_PROJECT } from '../generator.constants';
17 | import { StaticGenerator } from '../static.generator';
18 | import { ImportsScanner } from '../../scanners/imports.scanner';
19 | import { SourceFileImportsMap } from '../../interfaces/generator.interface';
20 | 
21 | jest.mock('../../utils/ts-morph.util');
22 | 
23 | describe('TRPCGenerator', () => {
24 |   let trpcGenerator: TRPCGenerator;
25 |   let consoleLogger: jest.Mocked<ConsoleLogger>;
26 |   let routerGenerator: jest.Mocked<RouterGenerator>;
27 |   let middlewareGenerator: jest.Mocked<MiddlewareGenerator>;
28 |   let contextGenerator: jest.Mocked<ContextGenerator>;
29 |   let routerFactory: jest.Mocked<RouterFactory>;
30 |   let middlewareFactory: jest.Mocked<MiddlewareFactory>;
31 |   let procedureFactory: jest.Mocked<ProcedureFactory>;
32 |   let importScanner: jest.Mocked<ImportsScanner>;
33 |   let project: Project;
34 |   let sourceFile: SourceFile;
35 | 
36 |   beforeEach(async () => {
37 |     project = new Project();
38 |     sourceFile = project.createSourceFile("test.ts", "", {overwrite: true});
39 | 
40 |     const module: TestingModule = await Test.createTestingModule({
41 |       providers: [
42 |         TRPCGenerator,
43 |         {
44 |           provide: ConsoleLogger,
45 |           useValue: {
46 |             log: jest.fn(),
47 |             warn: jest.fn(),
48 |           },
49 |         },
50 |         {
51 |           provide: RouterGenerator,
52 |           useValue: {
53 |             serializeRouters: jest.fn(),
54 |             generateRoutersStringFromMetadata: jest.fn(),
55 |           },
56 |         },
57 |         {
58 |           provide: MiddlewareGenerator,
59 |           useValue: {
60 |             getMiddlewareInterface: jest.fn(),
61 |           },
62 |         },
63 |         {
64 |           provide: ContextGenerator,
65 |           useValue: {
66 |             getContextInterface: jest.fn(),
67 |           },
68 |         },
69 |         {
70 |           provide: StaticGenerator,
71 |           useValue: {
72 |             generateStaticDeclaration: jest.fn(),
73 |             addSchemaImports: jest.fn(),
74 |           },
75 |         },
76 |         {
77 |           provide: RouterFactory,
78 |           useValue: {
79 |             getRouters: jest.fn(),
80 |           },
81 |         },
82 |         {
83 |           provide: MiddlewareFactory,
84 |           useValue: {
85 |             getMiddlewares: jest.fn(),
86 |           },
87 |         },
88 |         {
89 |           provide: ProcedureFactory,
90 |           useValue: {
91 |             getProcedures: jest.fn(),
92 |           },
93 |         },
94 |         {
95 |           provide: ImportsScanner,
96 |           useValue: {
97 |             buildSourceFileImportsMap: jest.fn(),
98 |             resolveBarrelFileImport: jest.fn(),
99 |           },
100 |         },
101 | 
102 |         { provide: TYPESCRIPT_PROJECT, useValue: project },
103 |         {
104 |           provide: TRPC_MODULE_CALLER_FILE_PATH,
105 |           useValue: sourceFile.getFilePath(),
106 |         },
107 |         {
108 |           provide: TYPESCRIPT_APP_ROUTER_SOURCE_FILE,
109 |           useValue: sourceFile,
110 |         },
111 |       ],
112 |     }).compile();
113 | 
114 |     trpcGenerator = module.get<TRPCGenerator>(TRPCGenerator);
115 |     consoleLogger = module.get(ConsoleLogger);
116 |     routerGenerator = module.get(RouterGenerator);
117 |     middlewareGenerator = module.get(MiddlewareGenerator);
118 |     contextGenerator = module.get(ContextGenerator);
119 |     routerFactory = module.get(RouterFactory);
120 |     middlewareFactory = module.get(MiddlewareFactory);
121 |     procedureFactory = module.get(ProcedureFactory);
122 |     importScanner = module.get(ImportsScanner);
123 |   });
124 | 
125 |   it('should be defined', () => {
126 |     expect(trpcGenerator).toBeDefined();
127 |   });
128 | 
129 |   describe('generateSchemaFile', () => {
130 |     it('should generate schema file', async () => {
131 |       const mockRouters = [{ name: 'TestRouter', instance: {}, alias: 'test', path: 'testPath', middlewares: [] }];
132 |       const mockProcedures: Array<ProcedureFactoryMetadata> = [{ 
133 |         name: 'testProcedure', 
134 |         implementation: jest.fn(), 
135 |         type: "query", 
136 |         input: undefined,
137 |         output: undefined,
138 |         params: [],
139 |         middlewares: [],
140 |       }];
141 |       const mockRoutersMetadata = [{ name: 'TestRouter', alias: 'test', procedures: [{ name: 'testProcedure', decorators: [] }], path: 'testPath'}];
142 | 
143 |       routerFactory.getRouters.mockReturnValue(mockRouters);
144 |       procedureFactory.getProcedures.mockReturnValue(mockProcedures);
145 |       routerGenerator.serializeRouters.mockReturnValue(mockRoutersMetadata);
146 |       routerGenerator.generateRoutersStringFromMetadata.mockReturnValue('test: t.router({})');
147 | 
148 |       jest.spyOn(project, 'createSourceFile').mockReturnValue(sourceFile);
149 |       (fileUtil.saveOrOverrideFile as jest.Mock).mockResolvedValue(undefined);
150 | 
151 |       await trpcGenerator.generateSchemaFile([{name: '/output/path'}]);
152 | 
153 |       expect(routerFactory.getRouters).toHaveBeenCalled();
154 |       expect(procedureFactory.getProcedures).toHaveBeenCalled();
155 |       expect(routerGenerator.serializeRouters).toHaveBeenCalledWith(expect.any(Array), expect.any(Project));
156 |       expect(routerGenerator.generateRoutersStringFromMetadata).toHaveBeenCalledWith(mockRoutersMetadata);
157 |       expect(fileUtil.saveOrOverrideFile).toHaveBeenCalled();
158 |       expect(consoleLogger.log).toHaveBeenCalledWith(
159 |         'AppRouter has been updated successfully at "./test.ts".',
160 |         'TRPC Generator'
161 |       );
162 |     });
163 | 
164 |     it('should handle errors', async () => {
165 |       routerFactory.getRouters.mockImplementation(() => {
166 |         throw new Error('Test error');
167 |       });
168 | 
169 |       await trpcGenerator.generateSchemaFile([{name: '/output/path'}]);
170 | 
171 |       expect(consoleLogger.warn).toHaveBeenCalledWith('TRPC Generator encountered an error.', expect.any(Error));
172 |     });
173 |   });
174 | 
175 |   describe('generateHelpersFile', () => {
176 |     it('should generate helpers file', async () => {
177 |       class TestMiddleware implements TRPCMiddleware {
178 |         use(opts: MiddlewareOptions<object>): MiddlewareResponse | Promise<MiddlewareResponse> {
179 |           throw new Error('Method not implemented.');
180 |         }
181 |       }
182 |       class TestContext implements TRPCContext {
183 |         create(opts: CreateExpressContextOptions): Record<string, unknown> | Promise<Record<string, unknown>> {
184 |           throw new Error('Method not implemented.');
185 |         }
186 |       }
187 | 
188 |       const mockMiddlewares = [{ instance: TestMiddleware, path: 'testPath' }];
189 |       const mockMiddlewareInterface = { name: 'TestMiddleware', properties: [{ name: 'test', type: 'string' }] };
190 |       const mockImportsMap = new Map<string, SourceFileImportsMap>([
191 |         [TestContext.name, {sourceFile, initializer: sourceFile.getClass(TestContext.name) as ClassDeclaration}]
192 |       ])
193 | 
194 |       middlewareFactory.getMiddlewares.mockReturnValue(mockMiddlewares);
195 |       middlewareGenerator.getMiddlewareInterface.mockResolvedValue(mockMiddlewareInterface);
196 |       contextGenerator.getContextInterface.mockResolvedValue('{ user: string }');
197 |       // importScanner.buildSourceFileImportsMap.mockImplementation((arg) => { console.log('arg:', arg); return mockImportsMap; })
198 |       importScanner.buildSourceFileImportsMap.mockReturnValue(mockImportsMap);
199 | 
200 |       // Call onModuleInit to set up the project
201 |       trpcGenerator.onModuleInit();
202 | 
203 |       jest.spyOn(project, 'createSourceFile').mockReturnValue(sourceFile);
204 |       (fileUtil.saveOrOverrideFile as jest.Mock).mockResolvedValue(undefined);
205 | 
206 |       await trpcGenerator.generateHelpersFile(TestContext);
207 | 
208 |       expect(importScanner.buildSourceFileImportsMap).toHaveBeenCalled();
209 |       expect(middlewareFactory.getMiddlewares).toHaveBeenCalled();
210 |       expect(contextGenerator.getContextInterface).toHaveBeenCalled();
211 |       expect(middlewareGenerator.getMiddlewareInterface).toHaveBeenCalled();
212 |       expect(fileUtil.saveOrOverrideFile).toHaveBeenCalled();
213 |       expect(consoleLogger.log).toHaveBeenCalledWith(
214 |         'Helper types has been updated successfully at "nestjs-trpc/types".',
215 |         'TRPC Generator'
216 |       );
217 |     });
218 | 
219 |     it('should handle errors', async () => {
220 |       middlewareFactory.getMiddlewares.mockImplementation(() => {
221 |         throw new Error('Test error');
222 |       });
223 | 
224 |       await trpcGenerator.generateHelpersFile();
225 | 
226 |       expect(consoleLogger.warn).toHaveBeenCalledWith('TRPC Generator encountered an error.', expect.any(Error));
227 |     });
228 |   });
229 | });
```
