'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">savings-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-711b44afc5284f2f042595c29a0cea4a77703e4b0ef83e5ab34973876fc718c88308991be0a7603fd5c4fcada11d393f5d2328ee72e7773e4ec40a8b3ce8cb62"' : 'data-bs-target="#xs-controllers-links-module-AppModule-711b44afc5284f2f042595c29a0cea4a77703e4b0ef83e5ab34973876fc718c88308991be0a7603fd5c4fcada11d393f5d2328ee72e7773e4ec40a8b3ce8cb62"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-711b44afc5284f2f042595c29a0cea4a77703e4b0ef83e5ab34973876fc718c88308991be0a7603fd5c4fcada11d393f5d2328ee72e7773e4ec40a8b3ce8cb62"' :
                                            'id="xs-controllers-links-module-AppModule-711b44afc5284f2f042595c29a0cea4a77703e4b0ef83e5ab34973876fc718c88308991be0a7603fd5c4fcada11d393f5d2328ee72e7773e4ec40a8b3ce8cb62"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-711b44afc5284f2f042595c29a0cea4a77703e4b0ef83e5ab34973876fc718c88308991be0a7603fd5c4fcada11d393f5d2328ee72e7773e4ec40a8b3ce8cb62"' : 'data-bs-target="#xs-injectables-links-module-AppModule-711b44afc5284f2f042595c29a0cea4a77703e4b0ef83e5ab34973876fc718c88308991be0a7603fd5c4fcada11d393f5d2328ee72e7773e4ec40a8b3ce8cb62"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-711b44afc5284f2f042595c29a0cea4a77703e4b0ef83e5ab34973876fc718c88308991be0a7603fd5c4fcada11d393f5d2328ee72e7773e4ec40a8b3ce8cb62"' :
                                        'id="xs-injectables-links-module-AppModule-711b44afc5284f2f042595c29a0cea4a77703e4b0ef83e5ab34973876fc718c88308991be0a7603fd5c4fcada11d393f5d2328ee72e7773e4ec40a8b3ce8cb62"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-16f037d59c159ccd6e46cc2c49d53e6103dd5b4684958933b20bbbf6fc0d82b4d2818aa17dc5ea374ddf8e97d1794acead72b39468cc3ce304d64390f98bef6f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-16f037d59c159ccd6e46cc2c49d53e6103dd5b4684958933b20bbbf6fc0d82b4d2818aa17dc5ea374ddf8e97d1794acead72b39468cc3ce304d64390f98bef6f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-16f037d59c159ccd6e46cc2c49d53e6103dd5b4684958933b20bbbf6fc0d82b4d2818aa17dc5ea374ddf8e97d1794acead72b39468cc3ce304d64390f98bef6f"' :
                                            'id="xs-controllers-links-module-AuthModule-16f037d59c159ccd6e46cc2c49d53e6103dd5b4684958933b20bbbf6fc0d82b4d2818aa17dc5ea374ddf8e97d1794acead72b39468cc3ce304d64390f98bef6f"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-16f037d59c159ccd6e46cc2c49d53e6103dd5b4684958933b20bbbf6fc0d82b4d2818aa17dc5ea374ddf8e97d1794acead72b39468cc3ce304d64390f98bef6f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-16f037d59c159ccd6e46cc2c49d53e6103dd5b4684958933b20bbbf6fc0d82b4d2818aa17dc5ea374ddf8e97d1794acead72b39468cc3ce304d64390f98bef6f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-16f037d59c159ccd6e46cc2c49d53e6103dd5b4684958933b20bbbf6fc0d82b4d2818aa17dc5ea374ddf8e97d1794acead72b39468cc3ce304d64390f98bef6f"' :
                                        'id="xs-injectables-links-module-AuthModule-16f037d59c159ccd6e46cc2c49d53e6103dd5b4684958933b20bbbf6fc0d82b4d2818aa17dc5ea374ddf8e97d1794acead72b39468cc3ce304d64390f98bef6f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-7e49b8518e9562d308cc73581f64d6e5426ff3f3cd6a6f58ad6d56b6a51ab86d9bbfddf8d689cee6b982e32e4a6b830402629a6849492c2ef07611e9406f153a"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-7e49b8518e9562d308cc73581f64d6e5426ff3f3cd6a6f58ad6d56b6a51ab86d9bbfddf8d689cee6b982e32e4a6b830402629a6849492c2ef07611e9406f153a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-7e49b8518e9562d308cc73581f64d6e5426ff3f3cd6a6f58ad6d56b6a51ab86d9bbfddf8d689cee6b982e32e4a6b830402629a6849492c2ef07611e9406f153a"' :
                                            'id="xs-controllers-links-module-PostsModule-7e49b8518e9562d308cc73581f64d6e5426ff3f3cd6a6f58ad6d56b6a51ab86d9bbfddf8d689cee6b982e32e4a6b830402629a6849492c2ef07611e9406f153a"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-7e49b8518e9562d308cc73581f64d6e5426ff3f3cd6a6f58ad6d56b6a51ab86d9bbfddf8d689cee6b982e32e4a6b830402629a6849492c2ef07611e9406f153a"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-7e49b8518e9562d308cc73581f64d6e5426ff3f3cd6a6f58ad6d56b6a51ab86d9bbfddf8d689cee6b982e32e4a6b830402629a6849492c2ef07611e9406f153a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-7e49b8518e9562d308cc73581f64d6e5426ff3f3cd6a6f58ad6d56b6a51ab86d9bbfddf8d689cee6b982e32e4a6b830402629a6849492c2ef07611e9406f153a"' :
                                        'id="xs-injectables-links-module-PostsModule-7e49b8518e9562d308cc73581f64d6e5426ff3f3cd6a6f58ad6d56b6a51ab86d9bbfddf8d689cee6b982e32e4a6b830402629a6849492c2ef07611e9406f153a"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-de203e0de2f61edc91c597b02f568a34dc2c3a1dbd8cd68dfa4d35c4e9abef683d6e68e98d305ba0fb684370e2eaea4ea7d5d3fa49ddddaf1b83422a59fb9bac"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-de203e0de2f61edc91c597b02f568a34dc2c3a1dbd8cd68dfa4d35c4e9abef683d6e68e98d305ba0fb684370e2eaea4ea7d5d3fa49ddddaf1b83422a59fb9bac"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-de203e0de2f61edc91c597b02f568a34dc2c3a1dbd8cd68dfa4d35c4e9abef683d6e68e98d305ba0fb684370e2eaea4ea7d5d3fa49ddddaf1b83422a59fb9bac"' :
                                            'id="xs-controllers-links-module-UsersModule-de203e0de2f61edc91c597b02f568a34dc2c3a1dbd8cd68dfa4d35c4e9abef683d6e68e98d305ba0fb684370e2eaea4ea7d5d3fa49ddddaf1b83422a59fb9bac"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-de203e0de2f61edc91c597b02f568a34dc2c3a1dbd8cd68dfa4d35c4e9abef683d6e68e98d305ba0fb684370e2eaea4ea7d5d3fa49ddddaf1b83422a59fb9bac"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-de203e0de2f61edc91c597b02f568a34dc2c3a1dbd8cd68dfa4d35c4e9abef683d6e68e98d305ba0fb684370e2eaea4ea7d5d3fa49ddddaf1b83422a59fb9bac"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-de203e0de2f61edc91c597b02f568a34dc2c3a1dbd8cd68dfa4d35c4e9abef683d6e68e98d305ba0fb684370e2eaea4ea7d5d3fa49ddddaf1b83422a59fb9bac"' :
                                        'id="xs-injectables-links-module-UsersModule-de203e0de2f61edc91c597b02f568a34dc2c3a1dbd8cd68dfa4d35c4e9abef683d6e68e98d305ba0fb684370e2eaea4ea7d5d3fa49ddddaf1b83422a59fb9bac"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HbsRenderService.html" data-type="entity-link" >HbsRenderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateEditorService.html" data-type="entity-link" >TemplateEditorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZipExportService.html" data-type="entity-link" >ZipExportService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});