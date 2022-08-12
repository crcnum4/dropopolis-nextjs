(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 140:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/Logo.e8cb6aa2.png","height":52,"width":317,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAK0lEQVR4nGPUSVy188vXPxcfsLJwbrrz4LPxyacivxhYHvwSZuH4z8ggCAAuhg/4GpGMqAAAAABJRU5ErkJggg=="});

/***/ }),

/***/ 4524:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Footer_Footer)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./public/assets/logo.png
/* harmony default export */ const logo = ({"src":"/_next/static/media/logo.e8cb6aa2.png","height":52,"width":317,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAK0lEQVR4nGPUSVy188vXPxcfsLJwbrrz4LPxyacivxhYHvwSZuH4z8ggCAAuhg/4GpGMqAAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./components/Home/Footer/AboutModule.tsx




const AboutModule = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        style: {
            ...props.style
        },
        className: props.className || "max-w-screen-sm text-left mb-8 mx-10 my-6",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                src: logo,
                alt: "Dropopolis",
                className: "h-10 w-fit"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: "mt-3",
                children: "A real city in the Metaverse, built by & for YOU!"
            })
        ]
    });
};
/* harmony default export */ const Footer_AboutModule = (AboutModule);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./components/Home/Footer/Copyright.tsx



const Copyright = (props)=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        style: {
            ...props.style
        },
        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
            href: "/",
            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                className: " text-gray-400",
                target: "_blank",
                rel: "noreferrer",
                children: "Copyright \xa9 2022 DropOplis & DevAccelerator. All Rights Reserved"
            })
        })
    });
};
/* harmony default export */ const Footer_Copyright = (Copyright);

;// CONCATENATED MODULE: ./components/Home/Footer/LinkModule.tsx



const linkData = [
    {
        title: "About Us",
        links: [
            {
                text: "About",
                url: "https://dropopolis.com"
            },
            {
                text: "Contact",
                url: "https://dropopolis.com"
            }
        ]
    },
    {
        title: "Links",
        links: [
            {
                text: "Blog",
                url: "https://dropopolis.com"
            },
            {
                text: "Help Center",
                url: "https://dropopolis.com"
            }
        ]
    },
    {
        title: "Community Links",
        links: [
            {
                text: "Discord",
                url: "https://dropopolis.com"
            },
            {
                text: "Community",
                url: "https://dropopolis.com"
            }
        ]
    }
];
const LinksModule = (props)=>{
    const displayLinks = ()=>{
        const displaySectionLinks = (linkSection)=>{
            return linkSection.links.map((l, i)=>{
                return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: l.url,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: l.text
                    })
                }, i);
            });
        };
        return linkData.map((linkSection)=>{
            return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "",
                style: {
                    minWidth: 130
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "font-bold text-left text-xl mb-4 text-gray-700",
                        children: linkSection.title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "flex-column text-left text-blue-500",
                            children: displaySectionLinks(linkSection)
                        })
                    })
                ]
            }, linkSection.title);
        });
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        style: {
            ...props.style
        },
        className: props.className || "flex-row mb-8 mx-10 my-6",
        children: displayLinks()
    });
};
/* harmony default export */ const LinkModule = (LinksModule);

// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
;// CONCATENATED MODULE: external "@fortawesome/free-brands-svg-icons"
const free_brands_svg_icons_namespaceObject = require("@fortawesome/free-brands-svg-icons");
;// CONCATENATED MODULE: ./components/Home/Footer/SocialModule.tsx




const SocialModule = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        style: {
            ...props.style
        },
        className: props.className || "mx-13 my-6",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: "font-bold text-xl text-center mb-4 text-gray-700",
                children: "Social Media"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex-row flex-wrap justify-between text-white",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://dropopolis.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "m-1 mt-0 bg-blue-300 rounded-lg py-2 px-3 ",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                            icon: free_brands_svg_icons_namespaceObject.faInstagram,
                            size: "2x"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://dropopolis.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "m-1 mt-0 bg-blue-300 rounded-lg py-2 px-3 ",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                            icon: free_brands_svg_icons_namespaceObject.faTwitter,
                            size: "2x"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://dropopolis.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "m-1 mt-0 bg-blue-300 rounded-lg py-2 px-3 ",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                            icon: free_brands_svg_icons_namespaceObject.faFacebook,
                            size: "2x"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://dropopolis.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "m-1 mt-0 bg-blue-300 rounded-lg py-2 px-3 ",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                            icon: free_brands_svg_icons_namespaceObject.faTelegram,
                            size: "2x"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Footer_SocialModule = (SocialModule);

;// CONCATENATED MODULE: ./components/Home/Footer/Footer.tsx






const Footer = (props)=>{
    // what does .bt-black do?
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex-1 py-7 .bt-black justify-center items-center flex-grow text-center",
        style: {
            ...props.style
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                style: {
                    width: "85vw",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center" //'space-between'
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Footer_AboutModule, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(LinkModule, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(Footer_SocialModule, {})
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {
                className: "my-5 w-full"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Footer_Copyright, {})
        ]
    });
};
/* harmony default export */ const Footer_Footer = (Footer);


/***/ }),

/***/ 1641:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Home_Footer_Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4524);
/* harmony import */ var _Navigation_Navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3512);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Navigation_Navbar__WEBPACK_IMPORTED_MODULE_3__]);
_Navigation_Navbar__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const Layout = ({ children  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Navigation_Navbar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}),
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Home_Footer_Footer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {})
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6500:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1247);
/* harmony import */ var _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8847);
/* harmony import */ var _common_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4428);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6466);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_2__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__]);
([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_2__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const NavLinks = ()=>{
    const wallet = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_2__.useWallet)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "hidden lg:flex items-center flex-row",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    className: "py-3 px-5 mx-1 my-4",
                    children: "Drops"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    className: "py-3 px-5 mx-1 my-4",
                    children: "StakeHOUSE"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    className: "py-3 px-5 mx-1 my-4",
                    children: "About"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_Button__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                className: "py-3 px-5 mx-2 my-4",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__.FontAwesomeIcon, {
                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faMagnifyingGlass,
                    size: "lg"
                })
            }),
            wallet ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__.WalletMultiButton, {}) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__.WalletDisconnectButton, {})
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavLinks);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8788:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1247);
/* harmony import */ var _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8847);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_1__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_2__]);
([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_1__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const NavMenu = ()=>{
    const wallet = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_1__.useWallet)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "lg:hidden absolute top-[80px] right-[50px] md:right-[175px] bg-gray-300 border shadow-lg z-20 flex flex-col justify-evenly items-center rounded-b-xl",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
            className: "flex flex-col items-center justify-between min-h-[250px] text-lg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                    className: "border-b border-gray-400 m-3 uppercase",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            children: "Drops"
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                    className: "border-b border-gray-400 m-3 uppercase",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            children: "StakeHOUSE"
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                    className: "border-b border-gray-400 m-3 uppercase",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            children: "About"
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                    className: "border-b border-gray-400 m-3 uppercase",
                    children: wallet ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_2__.WalletMultiButton, {}) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_2__.WalletDisconnectButton, {})
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavMenu);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3512:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _public_assets_Logo_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(140);
/* harmony import */ var _common_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4428);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6466);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1247);
/* harmony import */ var _NavMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8788);
/* harmony import */ var _NavLinks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6500);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_8__, _NavMenu__WEBPACK_IMPORTED_MODULE_9__, _NavLinks__WEBPACK_IMPORTED_MODULE_10__]);
([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_8__, _NavMenu__WEBPACK_IMPORTED_MODULE_9__, _NavLinks__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const Navbar = ()=>{
    const { 0: showMenu , 1: setShowMenu  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const wallet = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_8__.useWallet)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
        className: "bg-white shadow-lg flex-row",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-row md:mx-28 px-4 justify-between ",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "space-x-7 cursor-pointer justify-center",
                        onClick: ()=>router.push("/"),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                            alt: "Dropopolis",
                            src: _public_assets_Logo_png__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_NavLinks__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "lg:hidden items-center flex-row",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_Button__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                className: "py-3 px-5 my-2 md:my-4",
                                onClick: ()=>setShowMenu(!showMenu),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
                                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__.faBars,
                                    size: "lg"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_Button__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                className: "py-3 px-5 mx-4 my-4",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
                                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__.faMagnifyingGlass,
                                    size: "lg"
                                })
                            })
                        ]
                    })
                ]
            }),
            showMenu ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_NavMenu__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {}) : null
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Button = (props)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        type: props.type || "submit",
        style: {
            ...props.style
        },
        className: props.className || "bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-fit my-5",
        onClick: props.onClick,
        disabled: props.disabled,
        children: props.disabled ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
            children: "Loading"
        }) : props.children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ }),

/***/ 6434:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export SolanaProvider */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3364);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1247);
/* harmony import */ var _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7280);
/* harmony import */ var _solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6153);
/* harmony import */ var _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8847);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7831);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_2__, _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__, _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_4__, _solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_5__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__]);
([_solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_2__, _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__, _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_4__, _solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_5__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const SolanaProvider = (props)=>{
    const network =  true ? _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_2__.WalletAdapterNetwork.Devnet : 0;
    const endpoint = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        switch(network){
            case _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_2__.WalletAdapterNetwork.Devnet:
                return "https://long-twilight-glade.solana-devnet.quiknode.pro/6db5d4e8dfde1507063a5393d31dda811177a5ac/" || 0;
            case _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_2__.WalletAdapterNetwork.Mainnet:
                return "https://empty-misty-firefly.solana-mainnet.quiknode.pro/6d7f6bacb644285615b4a0a26ebf763d8000c1fe/" || 0;
        }
    }, [
        network
    ]);
    const wallets = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>[
            new _solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_5__.SolanaMobileWalletAdapter({
                appIdentity: {
                    name: "Dropopolis"
                },
                authorizationResultCache: (0,_solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_5__.createDefaultAuthorizationResultCache)(),
                cluster: network
            }),
            new _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_4__.PhantomWalletAdapter(),
            new _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_4__.SolflareWalletAdapter(),
            new _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_4__.TorusWalletAdapter(), 
        ], [
        network
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__.ConnectionProvider, {
        endpoint: endpoint,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__.WalletProvider, {
            wallets: wallets,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__.WalletModalProvider, {
                children: props.children
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SolanaProvider);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5656:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_providers_SolanaProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6434);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1641);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_providers_SolanaProvider__WEBPACK_IMPORTED_MODULE_1__, _components_Layout__WEBPACK_IMPORTED_MODULE_2__]);
([_components_providers_SolanaProvider__WEBPACK_IMPORTED_MODULE_1__, _components_Layout__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




__webpack_require__(2121);
function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_providers_SolanaProvider__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                ...pageProps
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2121:
/***/ (() => {



/***/ }),

/***/ 6466:
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ 7197:
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ 7831:
/***/ ((module) => {

"use strict";
module.exports = require("@solana/web3.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6153:
/***/ ((module) => {

"use strict";
module.exports = import("@solana-mobile/wallet-adapter-mobile");;

/***/ }),

/***/ 3364:
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-base");;

/***/ }),

/***/ 1247:
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-react");;

/***/ }),

/***/ 8847:
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-react-ui");;

/***/ }),

/***/ 7280:
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-wallets");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [311,952,910,664,675], () => (__webpack_exec__(5656)));
module.exports = __webpack_exports__;

})();