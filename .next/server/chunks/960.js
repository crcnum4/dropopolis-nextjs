"use strict";
exports.id = 960;
exports.ids = [960];
exports.modules = {

/***/ 4428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 4874:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Form = (props)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
        style: {
            ...props.style
        },
        className: props.className || "flex flex-col text-center w-full mb-6 max-w-4xl",
        onSubmit: (e)=>{
            e.preventDefault();
            props.onSubmit(e);
        },
        children: props.children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);


/***/ }),

/***/ 4703:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const InlineInputContainer = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [
            props.error ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                style: styles.error,
                children: props.error
            }) : null,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    ...props.style
                },
                className: "flex flex-wrap flex-row m-2",
                children: props.children
            })
        ]
    });
};
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minWidth: "200px",
        borderRadius: "5px",
        overflow: "hidden",
        flexWrap: "wrap",
        flexDirection: "row"
    },
    error: {
        color: "red",
        fontWeight: "bold",
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 2,
        paddingBottom: 2,
        margin: "0px 0px 2px 0px"
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InlineInputContainer);


/***/ }),

/***/ 1753:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


//some input types ie 'file' does not support modifying the 'value' prop. 
//As we find other input types that do not support 'value' we can add them to this list and make them safe to use with this component
// const nonValueInputs: {[key: string]: number} = {file: 1} //using an object for n(1) searching
const Input = (props)=>{
    const inputType = props.type || "text";
    const input = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
        style: props.error ? {
            ...props.errorStyle
        } : {
            ...props.style
        },
        className: props.error ? props.errorClassName || "p-2 m-1 flex-1 border-red-500 border rounded-md" : props.className || "p-2 m-1 flex-1 border rounded-md",
        id: props.id,
        type: inputType,
        placeholder: props.placeholder,
        onChange: props.onChange,
        required: props.disabled,
        value: props.value,
        accept: props.accept,
        multiple: props.multiple,
        disabled: props.disabled,
        min: props.min,
        max: props.max
    });
    const errorLabel = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
        style: styles.error,
        children: props.error
    });
    if (props.label) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: styles.container,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: props.id,
                            children: props.label
                        }),
                        input
                    ]
                }),
                props.error ? errorLabel : null
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [
            input,
            props.error ? errorLabel : null
        ]
    });
};
const styles = {
    input: {
        color: "#000",
        backgroundColor: "#eee",
        padding: 5,
        fontSize: 18,
        borderColor: "black",
        borderWidth: 1,
        width: "100%",
        flex: 1,
        height: "auto",
        minWidth: "100px",
        borderRadius: "0.75rem",
        margin: "0.50rem 0"
    },
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    inputError: {
        color: "#000",
        backgroundColor: "#eee",
        padding: 5,
        fontSize: 18,
        borderColor: "red",
        borderWidth: 2,
        width: "60%",
        height: "auto",
        flex: 1
    },
    error: {
        color: "red",
        fontWeight: "bold",
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 3,
        paddingLeft: 5
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);


/***/ })

};
;