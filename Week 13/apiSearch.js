let names = Object.getOwnPropertyNames(window)

function filterOut(names, props) {
    let set = new Set()
    props.forEach(o => set.add(o))
    return names.filter(e => !set.has(e))
}

// ECMA 262
// https://tc39.es/ecma262/
{
    // let js = new Set()
    // to get them
    // copy(Array.from(new Set([...document.querySelectorAll("#sec-global-object > emu-clause > emu-clause > h1, #sec-additional-built-in-properties > emu-annex > emu-annex > h1, #sec-uri-handling-functions > emu-clause > h1, #sec-fundamental-objects > emu-clause > emu-clause > h1, #sec-fundamental-objects > emu-clause > emu-clause > emu-clause > h1")].filter(item => /\w+/.exec(item.childNodes[1].data)).map(item => /\w+/.exec(item.childNodes[1].data)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
    let objects = [
        "globalThis",
        "Infinity",
        "NaN",
        "undefined",
        "eval",
        "isFinite",
        "isNaN",
        "parseFloat",
        "parseInt",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "Array",
        "ArrayBuffer",
        "BigInt",
        "BigInt64Array",
        "BigUint64Array",
        "Boolean",
        "DataView",
        "Date",
        "Error",
        "EvalError",
        "FinalizationRegistry",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Number",
        "Object",
        "Promise",
        "Proxy",
        "RangeError",
        "ReferenceError",
        "RegExp",
        "Set",
        "SharedArrayBuffer",
        "String",
        "Symbol",
        "SyntaxError",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "URIError",
        "WeakMap",
        "WeakRef",
        "WeakSet",
        "Atomics",
        "JSON",
        "Math",
        "Reflect",
        "length",
        "name",
        "AggregateError",
        "escape",
        "unescape"
    ]
    // objects.forEach(o => js.add(o))
    // names = names.filter(e => !js.has(e))
    names = filterOut(names, objects)
}

// http://www.ecma-international.org/ecma-402/5.0/index.html#Title
names = filterOut(names, ["Intl"])

// Subclass of Mode
names = names.filter(e => {
    try {
        return !(window[e].prototype instanceof Node)
    } catch(err) {
        return true
    }
}).filter(e => e != "Node")

// events
names = names.filter(e => !e.match(/^on/))

// webkit private
names = names.filter(e => !e.match(/^webkit/))
names = names.filter(e => !e.match(/^WebKit/))

// https://console.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('a c-')].map(e => e.innerText))))
// then execute this on a new tab
// copy(pastedData.filter(e => Object.getOwnPropertyNames(window).includes(e)))
names = filterOut(names, [
    "debug",
    "table",
    "dir",
    "dirxml",
    "console"
])

// https://fetch.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] c-, [data-dfn-type] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Headers",
    "Blob",
    "FormData",
    "URLSearchParams",
    "ReadableStream",
    "Promise",
    "ArrayBuffer",
    "Request",
    "AbortSignal",
    "Response",
    "status",
    "fetch"
])

//https://html.spec.whatwg.org/#window

{
    // to get them
    // copy(Array.from(new Set([...document.querySelectorAll('.domintro > dt > code > a')].filter(item => item.parentNode.previousElementSibling && item.parentNode.previousElementSibling.innerText === "window").map(item => item.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
    // let windowprops = new Set()
    objects = [
        "customElements",
        "focus",
        "top",
        "opener",
        "parent",
        "frameElement",
        "window",
        "frames",
        "self",
        "document",
        "open",
        "name",
        "close",
        "closed",
        "stop",
        "length",
        "locationbar",
        "menubar",
        "personalbar",
        "scrollbars",
        "statusbar",
        "toolbar",
        "history",
        "location",
        "alert",
        "confirm",
        "prompt",
        "print",
        "navigator",
        "postMessage",
        "sessionStorage",
        "localStorage"
    ]
    // objects.forEach(o => windowprops.add(o))
    // names = names.filter(e => !windowprops.has(e))
    names = filterOut(names, objects)
}

//https://html.spec.whatwg.org/

{
    // let interfaces = new Set()
    // to find these interfaces and constructors
    // copy(Array.from(new Set([...[...document.querySelectorAll('dfn c-')].filter(item => item.parentNode.previousElementSibling && item.parentNode.previousElementSibling.innerText === "interface").map(item => item.innerText), ...[...document.querySelectorAll('.domintro > dt > code > a')].filter(item => item.parentNode.previousSibling && item.parentNode.previousSibling.nodeValue.search("= new") >= 0).map(item => item.innerText)].filter(e => Object.getOwnPropertyNames(window).includes(e)))))
    objects = [
        "HTMLAllCollection",
        "HTMLFormControlsCollection",
        "RadioNodeList",
        "HTMLOptionsCollection",
        "DOMStringList",
        "Document",
        "HTMLElement",
        "HTMLUnknownElement",
        "DOMStringMap",
        "HTMLHtmlElement",
        "HTMLHeadElement",
        "HTMLTitleElement",
        "HTMLBaseElement",
        "HTMLLinkElement",
        "HTMLMetaElement",
        "HTMLStyleElement",
        "HTMLBodyElement",
        "HTMLHeadingElement",
        "HTMLParagraphElement",
        "HTMLHRElement",
        "HTMLPreElement",
        "HTMLQuoteElement",
        "HTMLOListElement",
        "HTMLUListElement",
        "HTMLMenuElement",
        "HTMLLIElement",
        "HTMLDListElement",
        "HTMLDivElement",
        "HTMLAnchorElement",
        "HTMLDataElement",
        "HTMLTimeElement",
        "HTMLSpanElement",
        "HTMLBRElement",
        "HTMLModElement",
        "HTMLPictureElement",
        "HTMLSourceElement",
        "HTMLImageElement",
        "HTMLIFrameElement",
        "HTMLEmbedElement",
        "HTMLObjectElement",
        "HTMLParamElement",
        "HTMLVideoElement",
        "HTMLAudioElement",
        "HTMLTrackElement",
        "HTMLMediaElement",
        "MediaError",
        "TextTrackList",
        "TextTrack",
        "TextTrackCueList",
        "TextTrackCue",
        "TimeRanges",
        "TrackEvent",
        "HTMLMapElement",
        "HTMLAreaElement",
        "HTMLTableElement",
        "HTMLTableCaptionElement",
        "HTMLTableColElement",
        "HTMLTableSectionElement",
        "HTMLTableRowElement",
        "HTMLTableCellElement",
        "HTMLFormElement",
        "HTMLLabelElement",
        "HTMLInputElement",
        "HTMLButtonElement",
        "HTMLSelectElement",
        "HTMLDataListElement",
        "HTMLOptGroupElement",
        "HTMLOptionElement",
        "HTMLTextAreaElement",
        "HTMLOutputElement",
        "HTMLProgressElement",
        "HTMLMeterElement",
        "HTMLFieldSetElement",
        "HTMLLegendElement",
        "ValidityState",
        "SubmitEvent",
        "FormDataEvent",
        "HTMLDetailsElement",
        "HTMLDialogElement",
        "HTMLScriptElement",
        "HTMLTemplateElement",
        "HTMLSlotElement",
        "HTMLCanvasElement",
        "CanvasRenderingContext2D",
        "CanvasGradient",
        "CanvasPattern",
        "TextMetrics",
        "ImageData",
        "Path2D",
        "ImageBitmapRenderingContext",
        "OffscreenCanvas",
        "OffscreenCanvasRenderingContext2D",
        "CustomElementRegistry",
        "ElementInternals",
        "DataTransfer",
        "DataTransferItemList",
        "DataTransferItem",
        "DragEvent",
        "Window",
        "BarProp",
        "History",
        "Location",
        "PopStateEvent",
        "HashChangeEvent",
        "PageTransitionEvent",
        "BeforeUnloadEvent",
        "ErrorEvent",
        "PromiseRejectionEvent",
        "DOMParser",
        "Navigator",
        "ImageBitmap",
        "MessageEvent",
        "EventSource",
        "WebSocket",
        "CloseEvent",
        "MessageChannel",
        "MessagePort",
        "BroadcastChannel",
        "Worker",
        "SharedWorker",
        "Worklet",
        "Storage",
        "StorageEvent",
        "HTMLMarqueeElement",
        "HTMLFrameSetElement",
        "HTMLFrameElement",
        "HTMLDirectoryElement",
        "HTMLFontElement",
        "External",
        "PluginArray",
        "MimeTypeArray",
        "Plugin",
        "MimeType",
        "Image",
        "Audio",
        "Option"
    ]
    // objects.forEach(o => interfaces.add(o))

    // names = names.filter(e => !interfaces.has(e))
    names = filterOut(names, objects)
}

// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html
// copy(Array.from(new Set([...document.querySelectorAll('dfn[id] code')].map(e => /\w+/.exec(e.innerText)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "setTimeout",
    "setInterval",
    "clearTimeout",
    "clearInterval",
    "queueMicrotask",
    "alert",
    "confirm",
    "prompt",
    "print"
])

// https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html
// copy(Array.from(new Set([...document.querySelectorAll('dfn[id] code')].map(e => /\w+/.exec(e.innerText)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "createImageBitmap",
    "close",
    "requestAnimationFrame",
    "cancelAnimationFrame"
])

// https://html.spec.whatwg.org/multipage/webappapis.html
// copy(Array.from(new Set([...document.querySelectorAll('code[id] a')].map(e => /\w+/.exec(e.innerText)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Window",
    "document",
    "Atomics",
    "SharedArrayBuffer",
    "history",
    "Document",
    "print",
    "navigator",
    "Navigator",
    "postMessage",
    "MessageEvent",
    "setTimeout",
    "location",
    "DOMException",
    "TypeError",
    "window",
    "EventTarget",
    "ErrorEvent",
    "PromiseRejectionEvent",
    "FinalizationRegistry",
    "WeakRef",
    "eval",
    "Event",
    "onmessage",
    "MessagePort",
    "BeforeUnloadEvent",
    "Function",
    "onerror",
    "onbeforeunload",
    "close",
    "blur",
    "focus",
    "scroll",
    "copy",
    "HTMLElement",
    "PointerEvent",
    "isSecureContext",
    "origin",
    "crossOriginIsolated",
    "atob",
    "btoa"
])

// https://html.spec.whatwg.org/multipage/window-object.html
// copy(Array.from(new Set([...document.querySelectorAll('dfn code, code a, dfn c-, a c-')].map(e => /\w+/.exec(e.innerText)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Window",
    "EventTarget",
    "window",
    "self",
    "Document",
    "document",
    "name",
    "Location",
    "location",
    "History",
    "history",
    "CustomElementRegistry",
    "customElements",
    "BarProp",
    "locationbar",
    "menubar",
    "personalbar",
    "scrollbars",
    "statusbar",
    "toolbar",
    "status",
    "close",
    "closed",
    "stop",
    "focus",
    "blur",
    "frames",
    "length",
    "top",
    "opener",
    "parent",
    "Element",
    "frameElement",
    "open",
    "Navigator",
    "navigator",
    "alert",
    "confirm",
    "prompt",
    "print",
    "postMessage",
    "HTMLDocument",
    "onclick",
    "DOMException",
    "HTMLCollection"
])

// https://xhr.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "XMLHttpRequestEventTarget",
    "XMLHttpRequestUpload",
    "XMLHttpRequest",
    "FormData",
    "ProgressEvent"
])

// https://streams.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "ReadableStream",
    "ReadableStreamDefaultReader",
    "ReadableStreamBYOBReader",
    "ReadableStreamDefaultController",
    "ReadableByteStreamController",
    "ReadableStreamBYOBRequest",
    "WritableStream",
    "WritableStreamDefaultWriter",
    "TransformStream",
    "ByteLengthQueuingStrategy",
    "CountQueuingStrategy"
])

// https://storage.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-, a c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "StorageManager"
])

// https://url.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    // this was filtered before on line 95 as a webkit private
    "webkitURL",
    "URL",
    "URLSearchParams"
])

// https://dom.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('dfn[data-dfn-type] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Event",
    "CustomEvent",
    "EventTarget",
    "event",
    "AbortController",
    "AbortSignal",
    "NodeList",
    "HTMLCollection",
    "name",
    "MutationObserver",
    "MutationRecord",
    "Node",
    "Document",
    "XMLDocument",
    "DOMImplementation",
    "DocumentType",
    "DocumentFragment",
    "ShadowRoot",
    "Element",
    "NamedNodeMap",
    "Attr",
    "CharacterData",
    "Text",
    "CDATASection",
    "ProcessingInstruction",
    "Comment",
    "StaticRange",
    "Range",
    "NodeIterator",
    "TreeWalker",
    "NodeFilter",
    "DOMTokenList",
    "XPathResult",
    "XPathExpression",
    "XPathEvaluator"
])

// https://encoding.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "TextDecoder",
    "TextEncoder",
    "TextDecoderStream",
    "TextEncoderStream"
])

// https://fetch.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Headers",
    "Request",
    "Response"
])

// https://console.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="namespace"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "console"
])

// https://notifications.spec.whatwg.org/
// copy(Array.from(new Set([...document.querySelectorAll('code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Notification"
])

// https://www.khronos.org/registry/webgl/specs/latest/1.0
// copy(Array.from(new Set([...document.querySelectorAll('[id^="5."]')].map(e => /\w+/.exec(e.childNodes[e.childNodes.length-1].innerText ? e.childNodes[e.childNodes.length-1].innerText : e.childNodes[e.childNodes.length-1].nodeValue)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))

names = filterOut(names, [
    "WebGLBuffer",
    "WebGLFramebuffer",
    "WebGLProgram",
    "WebGLRenderbuffer",
    "WebGLShader",
    "WebGLTexture",
    "WebGLUniformLocation",
    "WebGLActiveInfo",
    "WebGLShaderPrecisionFormat",
    "WebGLContextEvent"
])

// https://www.khronos.org/registry/webgl/specs/latest/2.0/
// copy(Array.from(new Set([...document.querySelectorAll('[id^="3."]')].filter(e => e.nextElementSibling && e.nextElementSibling.querySelectorAll("code").length).map(e => e.nextElementSibling.querySelector("code").innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))

names = filterOut(names, [
    "WebGLQuery",
    "WebGLSampler",
    "WebGLSync",
    "WebGLTransformFeedback",
    "WebGLVertexArrayObject",
    "WebGL2RenderingContext"
])

names = filterOut(names, [
    // 2.1 Context Creation
    "WebGLRenderingContext"
])

// https://www.w3.org/TR/accelerometer/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Accelerometer",
    "LinearAccelerationSensor"
])

// https://www.w3.org/TR/webaudio/
// copy(Array.from(new Set([...[...document.querySelectorAll(".heading .content code a")].map(e => /\w+/.exec(e.innerText)[0]), ...[...document.querySelectorAll("dfn code c-")].filter(e => e.parentNode.parentNode.previousElementSibling.innerText === "interface").map(e => e.innerText)].filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "BaseAudioContext",
    "AudioContext",
    "OfflineAudioContext",
    "OfflineAudioCompletionEvent",
    "AudioBuffer",
    "AudioNode",
    "AudioParam",
    "AudioScheduledSourceNode",
    "AnalyserNode",
    "AudioBufferSourceNode",
    "AudioDestinationNode",
    "AudioListener",
    "AudioProcessingEvent",
    "BiquadFilterNode",
    "ChannelMergerNode",
    "ChannelSplitterNode",
    "ConstantSourceNode",
    "ConvolverNode",
    "DelayNode",
    "DynamicsCompressorNode",
    "GainNode",
    "IIRFilterNode",
    "MediaElementAudioSourceNode",
    "MediaStreamAudioDestinationNode",
    "MediaStreamAudioSourceNode",
    "OscillatorNode",
    "PannerNode",
    "PeriodicWave",
    "ScriptProcessorNode",
    "StereoPannerNode",
    "WaveShaperNode",
    "AudioWorklet",
    "AudioWorkletNode",
    "AudioParamMap"
])

// https://www.w3.org/TR/WebCryptoAPI/
// copy(Array.from(new Set([...document.querySelectorAll('dfn[id]')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Crypto",
    "CryptoKey",
    "SubtleCrypto"
])

// https://www.w3.org/TR/webxrlayers-1/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type] c-, a code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "XRWebGLBinding"
])

//https://www.w3.org/TR/DOM-Level-3-XPath/xpath.html
// copy(Array.from(new Set([...document.querySelectorAll("i a[name]")].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "XPathEvaluator",
    "XPathExpression",
    "XPathResult"
])

// https://www.w3.org/TR/generic-sensor/
// copy(Array.from(new Set([...document.querySelectorAll("dfn c-")].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Sensor",
    "SensorErrorEvent"
])

// https://www.w3.org/TR/SVG11/shapes.html
// copy(Array.from(new Set([...[...document.querySelectorAll('pre.idl b, .idlinterface')].map(e => e.innerText)].filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "SVGRectElement",
    "SVGCircleElement",
    "SVGEllipseElement",
    "SVGLineElement",
    "SVGPolylineElement",
    "SVGPolygonElement",
    "SVGElement",
    "SVGAnimatedLength",
    "SVGPointList"
])

// https://www.w3.org/TR/navigation-timing/
// copy(Array.from(new Set([...document.querySelectorAll('pre.idl dfn')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PerformanceTiming",
    "PerformanceNavigation",
    "Performance",
    "performance"
])

// https://www.w3.org/TR/IndexedDB/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-, [data-link-type="attribute"] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "IDBRequest",
    "IDBOpenDBRequest",
    "IDBVersionChangeEvent",
    "indexedDB",
    "IDBFactory",
    "IDBDatabase",
    "IDBObjectStore",
    "IDBIndex",
    "IDBKeyRange",
    "IDBCursor",
    "IDBCursorWithValue",
    "IDBTransaction"
])

// https://www.w3.org/TR/orientation-sensor/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "OrientationSensor",
    "AbsoluteOrientationSensor",
    "RelativeOrientationSensor"
])

// https://www.w3.org/TR/payment-handler/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PaymentManager",
    "PaymentInstruments"
])

// https://www.w3.org/TR/presentation-api/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PresentationRequest",
    "PresentationConnection",
    "Presentation",
    "PresentationAvailability",
    "PresentationConnectionAvailableEvent",
    "PresentationConnectionCloseEvent",
    "PresentationConnectionList",
    "PresentationReceiver",
])

// https://www.w3.org/TR/requestidlecallback/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "requestAnimationFrame",
    "requestIdleCallback",
    "cancelIdleCallback",
    "IdleDeadline",
    "setInterval"
])

// https://www.w3.org/TR/remote-playback/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "RemotePlayback"
])

// https://github.com/w3c/webrtc-pc/issues/2507
names = filterOut(names, [
    "RTCEncodedVideoFrame", "RTCEncodedAudioFrame"
])

// https://w3c.github.io/clipboard-apis/
// copy gets edited on the page. so not working
// Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] c-, [data-link-type="dfn"], [data-link-type="idl"]')].map(e => /\w+/.exec(e.innerText)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e))))
names = filterOut(names, [
    "ClipboardItem",
    "ClipboardEvent",
    "Clipboard",
])

// https://w3c.github.io/DOM-Parsing/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"]')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "XMLSerializer",
    "Element",
    "Range"
])

// https://w3c.github.io/deviceorientation/
// copy(Array.from(new Set([...document.querySelectorAll('dfn[data-dfn-type] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "ondeviceorientation",
    "DeviceOrientationEvent",
    "ondeviceorientationabsolute",
    "ondevicemotion",
    "DeviceMotionEventAcceleration",
    "DeviceMotionEventRotationRate",
    "DeviceMotionEvent"
])

// https://w3c.github.io/media-source/
// copy(Array.from(new Set([...document.querySelectorAll('a[data-link-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "SourceBuffer",
    "MediaSource",
    "SourceBufferList"
])

// https://w3c.github.io/mediasession/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "MediaSession",
    "MediaMetadata"
])

// https://w3c.github.io/mediacapture-image/#imagecaptureapi
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "ImageCapture"
])

// https://w3c.github.io/picture-in-picture/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PictureInPictureWindow",
    "PictureInPictureEvent"
])

// https://w3c.github.io/uievents/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "UIEvent",
    "FocusEvent",
    "MouseEvent",
    "WheelEvent",
    "InputEvent",
    "KeyboardEvent",
    "CompositionEvent",
    "MutationEvent"
])

// https://w3c.github.io/webvtt/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
// seems like "VTTRegion" not existing in my Chromium now
names = filterOut(names, [
    "VTTCue"
])

// https://w3c.github.io/webappsec-credential-management/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Credential",
    "CredentialsContainer",
    "PasswordCredential",
    "FederatedCredential"
])

// https://w3c.github.io/webappsec-trusted-types/dist/spec/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "TrustedHTML",
    "TrustedScript",
    "TrustedScriptURL",
    "TrustedTypePolicyFactory",
    "TrustedTypePolicy",
    "name",
    "trustedTypes",
    "setTimeout",
    "setInterval",
    "DOMParser"
])

// https://w3c.github.io/touch-events/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Touch",
    "TouchList",
    "TouchEvent"
])

// https://w3c.github.io/longtasks/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PerformanceLongTaskTiming",
    "TaskAttributionTiming"
])

// https://w3c.github.io/selection-api/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Selection"
])

// https://w3c.github.io/webappsec-csp/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "SecurityPolicyViolationEvent"
])

// https://w3c.github.io/screen-orientation/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Screen",
    "ScreenOrientation"
])

// https://w3c.github.io/screen-wake-lock/
// copy(Array.from(new Set([...document.querySelectorAll('a[data-link-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "WakeLockSentinel",
    "WakeLock"
])

// https://w3c.github.io/reporting/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "ReportingObserver"
])

// https://w3c.github.io/webrtc-pc/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "RTCPeerConnection",
    "RTCSessionDescription",
    "RTCIceCandidate",
    "RTCPeerConnectionIceEvent",
    "RTCPeerConnectionIceErrorEvent",
    "RTCCertificate",
    "RTCRtpSender",
    "RTCRtpReceiver",
    "RTCRtpTransceiver",
    "RTCDtlsTransport",
    "RTCIceTransport",
    "RTCTrackEvent",
    "RTCSctpTransport",
    "RTCDataChannel",
    "RTCDataChannelEvent",
    "RTCDTMFSender",
    "RTCDTMFToneChangeEvent",
    "RTCStatsReport",
    "RTCError",
    "RTCErrorEvent"
])

// https://w3c.github.io/webauthn/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PublicKeyCredential",
    "ArrayBuffer",
    "Promise",
    "AuthenticatorResponse",
    "AuthenticatorAttestationResponse",
    "AuthenticatorAssertionResponse"
])

// https://w3c.github.io/pointerevents/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PointerEvent"
])

// https://w3c.github.io/server-timing/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PerformanceServerTiming",
    "PerformanceResourceTiming"
])

// https://w3c.github.io/paint-timing/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PerformancePaintTiming"
])

// https://w3c.github.io/performance-timeline/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Performance",
    "PerformanceEntry",
    "PerformanceObserver",
    "PerformanceObserverEntryList"
])

// https://w3c.github.io/navigation-timing/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PerformanceNavigationTiming",
    "PerformanceTiming",
    "PerformanceNavigation",
    "Performance"
])

// https://w3c.github.io/user-timing/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Performance",
    "PerformanceMark",
    "PerformanceMeasure"
])

// https://w3c.github.io/mediacapture-main/
// copy(Array.from(new Set([...document.querySelectorAll('dfn code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "MediaStreamTrack",
    "MediaStream",
    "MediaStreamTrackEvent",
    "OverconstrainedError",
    "Navigator",
    "MediaDevices",
    "MediaDeviceInfo",
    "InputDeviceInfo"
])

// https://w3c.github.io/presentation-api/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code, [data-idl="partial"]')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Navigator",
    "Presentation",
    "PresentationRequest",
    "PresentationAvailability",
    "PresentationConnectionAvailableEvent",
    "PresentationConnection",
    "PresentationConnectionCloseEvent",
    "PresentationReceiver",
    "PresentationConnectionList"
])


// https://w3c.github.io/mediacapture-record/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "MediaRecorder",
    "BlobEvent"
])

// https://w3c.github.io/encrypted-media/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Navigator",
    "MediaKeySystemAccess",
    "MediaKeys",
    "MediaKeySession",
    "MediaKeyStatusMap",
    "MediaKeyMessageEvent",
    "HTMLMediaElement",
    "MediaEncryptedEvent"
])

// https://w3c.github.io/media-capabilities/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "MediaCapabilities"
])

// https://w3c.github.io/IntersectionObserver/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "IntersectionObserver",
    "IntersectionObserverEntry"
])

// https://w3c.github.io/geolocation-api/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code, [data-dfn-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "GeolocationCoordinates",
    "GeolocationPositionError",
    "Geolocation",
    "GeolocationPosition"
])

// https://w3c.github.io/gamepad/extensions.html
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "GamepadHapticActuator",
    "Gamepad"
])

// https://w3c.github.io/gamepad/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Gamepad",
    "GamepadButton",
    "GamepadEvent"
])

// https://w3c.github.io/FileAPI/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Blob",
    "File",
    "FileList",
    "FileReader"
])

// https://w3c.github.io/ServiceWorker/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "ServiceWorker",
    "ServiceWorkerRegistration",
    "ServiceWorkerContainer",
    "NavigationPreloadManager",
    "Cache",
    "CacheStorage"
])

// https://w3c.github.io/payment-request/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PaymentAddress",
    "PaymentRequest",
    "PaymentResponse",
    "PaymentRequestUpdateEvent",
    "PaymentMethodChangeEvent"
])

// https://w3c.github.io/push-api/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PushSubscription",
    "PushSubscriptionOptions",
    "PushManager",
])

// https://w3c.github.io/permissions/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PermissionStatus",
    "Permissions"
])

// https://w3c.github.io/battery/
// copy(Array.from(new Set([...document.querySelectorAll('a[data-link-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "BatteryManager"
])

// https://w3c.github.io/selection-api/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] code, [data-dfn-type] code, [data-link-for="Window"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Selection",
    "Range",
    "getSelection",
    "onselectstart",
    "onselectionchange"
])

// window[0]
names = filterOut(names, ["0"])

//https://drafts.fxtf.org/geometry/
// copy(Array.from(new Set([...document.querySelectorAll("[data-dfn-type='interface'] code c-")].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "DOMPointReadOnly",
    "SVGPoint",
    "DOMPoint",
    "DOMRectReadOnly",
    "SVGRect",
    "DOMRect",
    "DOMRectList",
    "DOMQuad",
    "DOMMatrixReadOnly",
    "SVGMatrix",
    "WebKitCSSMatrix",
    "DOMMatrix"
])

// https://wicg.github.io/background-fetch/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "BackgroundFetchManager",
    "BackgroundFetchRegistration",
    "BackgroundFetchRecord"
])

// https://wicg.github.io/compression/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "CompressionStream",
    "DecompressionStream"
])

// https://wicg.github.io/visual-viewport/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Window",
    "VisualViewport"
])

// https://wicg.github.io/cookie-store/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] c-, [data-dfn-type] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "CookieStore",
    "CookieStoreManager",
    "CookieChangeEvent",
    "cookieStore"
])

// https://wicg.github.io/background-sync/spec/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "SyncManager"
])

// https://wicg.github.io/keyboard-map/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "KeyboardLayoutMap",
    "Keyboard"
])

// https://wicg.github.io/webhid/
// copy(Array.from(new Set([...document.querySelectorAll('dfn code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "HID",
    "HIDConnectionEvent",
    "HIDInputReportEvent",
    "HIDDevice"
])

// https://wicg.github.io/webusb/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "USB",
    "USBConnectionEvent",
    "USBDevice",
    "USBInTransferResult",
    "USBOutTransferResult",
    "USBIsochronousInTransferPacket",
    "USBIsochronousInTransferResult",
    "USBIsochronousOutTransferPacket",
    "USBIsochronousOutTransferResult",
    "USBConfiguration",
    "USBInterface",
    "USBAlternateInterface",
    "USBEndpoint"
])

// https://wicg.github.io/web-locks/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-, a c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "LockManager",
    "Lock",
])

// https://wicg.github.io/event-timing/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PerformanceEventTiming",
    "EventCounts"
])

// https://wicg.github.io/element-timing/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "PerformanceElementTiming"
])

// https://wicg.github.io/netinfo/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "NetworkInformation"
])

// https://wicg.github.io/layout-instability/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "LayoutShift",
    "LayoutShiftAttribution"
])

// https://wicg.github.io/largest-contentful-paint/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "LargestContentfulPaint"
])

// https://wicg.github.io/input-device-capabilities/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "InputDeviceCapabilities"
])

// https://wicg.github.io/file-system-access/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-, .idl a[data-link-type="idl"]')].map(e => /\w+/.exec(e.innerText)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "navigator",
    "PermissionStatus",
    "FileSystemHandle",
    "FileSystemFileHandle",
    "FileSystemDirectoryHandle",
    "File",
    "FileSystemWritableFileStream",
    "TypeError",
    "WritableStream",
    "WritableStreamDefaultWriter",
    "ReadableStream",
    "Blob",
    "showOpenFilePicker",
    "showSaveFilePicker",
    "showDirectoryPicker",
    "DataTransferItem"
])

// https://wicg.github.io/visual-viewport/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] code, [data-link-for="Window"] code')].map(e => /\w+/.exec(e.innerText)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "VisualViewport",
    "visualViewport",
    "onresize",
    "onscroll"
])

// https://wicg.github.io/speech-api/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-')].map(e => /\w+/.exec(e.innerText)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "speechSynthesis",
    "SpeechSynthesisUtterance",
    "SpeechSynthesisEvent",
    "SpeechSynthesisErrorEvent"
])

// https://wicg.github.io/serial/
// copy(Array.from(new Set([...document.querySelectorAll('dfn code')].map(e => /\w+/.exec(e.innerText)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "Serial",
    "SerialPort"
])

// https://drafts.csswg.org/css-transitions/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "TransitionEvent"
])

// https://drafts.csswg.org/cssom/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-, code.idl [data-link-type="idl"], [data-dfn-type="method"] code')].map(e => /\w+/.exec(e.innerText)[0]).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "MediaList",
    "CSSStyleSheet",
    "StyleSheet",
    "CSSRuleList",
    "CSSGroupingRule",
    "StyleSheetList",
    "Element",
    "Document",
    "CSSRule",
    "CSSStyleRule",
    "CSSImportRule",
    "CSSMediaRule",
    "CSSFontFaceRule",
    "CSSPageRule",
    "CSSNamespaceRule",
    "CSSKeyframesRule",
    "CSSKeyframeRule",
    "CSSSupportsRule",
    "CSSStyleDeclaration",
    "getComputedStyle",
    "CSS"
])

// https://drafts.csswg.org/css-animations-1/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "AnimationEvent",
    "CSSKeyframeRule",
    "CSSKeyframesRule"
])

// https://drafts.csswg.org/css-animations-2/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "CSSAnimation"
])

// https://drafts.csswg.org/css-transitions-2/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "CSSTransition"
])

// https://drafts.csswg.org/resize-observer/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "ResizeObserver",
    "ResizeObserverEntry",
    "ResizeObserverSize"
])

// https://drafts.csswg.org/cssom-view/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-, [data-link-type="method"] c-, [data-link-type="attribute"] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "matchMedia",
    "screen",
    "moveTo",
    "moveBy",
    "resizeTo",
    "resizeBy",
    "innerWidth",
    "innerHeight",
    "scrollX",
    "pageXOffset",
    "scrollY",
    "pageYOffset",
    "scroll",
    "scrollTo",
    "scrollBy",
    "screenX",
    "screenLeft",
    "screenY",
    "screenTop",
    "outerWidth",
    "outerHeight",
    "devicePixelRatio",
    "MediaQueryList",
    "onchange",
    "MediaQueryListEvent",
    "Screen"
])

// https://drafts.csswg.org/web-animations-1/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "AnimationTimeline",
    "DocumentTimeline",
    "Animation",
    "AnimationEffect",
    "KeyframeEffect",
    "AnimationPlaybackEvent"
])

// https://drafts.csswg.org/css-font-loading/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "FontFace",
    "FontFaceSetLoadEvent"
])


// https://drafts.css-houdini.org/css-typed-om-1/
// copy(Array.from(new Set([...document.querySelectorAll('[data-dfn-type="interface"] code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "CSSStyleValue",
    "StylePropertyMapReadOnly",
    "StylePropertyMap",
    "CSSUnparsedValue",
    "CSSVariableReferenceValue",
    "CSSKeywordValue",
    "CSSNumericValue",
    "CSSUnitValue",
    "CSSMathValue",
    "CSSMathSum",
    "CSSMathProduct",
    "CSSMathNegate",
    "CSSMathInvert",
    "CSSMathMin",
    "CSSMathMax",
    "CSSNumericArray",
    "CSSTransformValue",
    "CSSTransformComponent",
    "CSSTranslate",
    "CSSRotate",
    "CSSScale",
    "CSSSkew",
    "CSSSkewX",
    "CSSSkewY",
    "CSSPerspective",
    "CSSMatrixComponent",
    "CSSImageValue"
])

// https://drafts.css-houdini.org/css-properties-values-api-1/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "CSSPropertyRule"
])

// https://svgwg.org/svg2-draft/types.html
// copy(Array.from(new Set([...document.querySelectorAll('pre.idl b')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "SVGElement",
    "SVGGraphicsElement",
    "SVGGeometryElement",
    "SVGNumber",
    "SVGLength",
    "SVGAngle",
    "SVGNumberList",
    "SVGLengthList",
    "SVGStringList",
    "SVGAnimatedBoolean",
    "SVGAnimatedEnumeration",
    "SVGAnimatedInteger",
    "SVGAnimatedNumber",
    "SVGAnimatedLength",
    "SVGAnimatedAngle",
    "SVGAnimatedString",
    "SVGAnimatedRect",
    "SVGAnimatedNumberList",
    "SVGAnimatedLengthList",
    "SVGUnitTypes"
])

// https://svgwg.org/svg2-draft/coords.html
// copy(Array.from(new Set([...document.querySelectorAll('pre.idl b')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "SVGTransform",
    "SVGTransformList",
    "SVGAnimatedTransformList",
    "SVGPreserveAspectRatio",
    "SVGAnimatedPreserveAspectRatio"
])

// https://immersive-web.github.io/anchors/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "XRAnchor",
    "XRAnchorSet"
])

// https://immersive-web.github.io/dom-overlays/
// copy(Array.from(new Set([...document.querySelectorAll('dfn c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "XRDOMOverlayState"
])

// https://immersive-web.github.io/hit-test/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] c-, [data-dfn-type="interface"] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "XRHitTestSource",
    "XRTransientInputHitTestSource",
    "XRHitTestResult",
    "XRTransientInputHitTestResult",
    "XRSession",
    "XRFrame",
    "XRRay"
])

// https://immersive-web.github.io/webxr/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type="interface"] c-, [data-dfn-type="interface"] c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "XRSystem",
    "XRSession",
    "XRRenderState",
    "XRFrame",
    "XRSpace",
    "XRReferenceSpace",
    "XRBoundedReferenceSpace",
    "XRView",
    "XRViewport",
    "XRRigidTransform",
    "XRPose",
    "XRViewerPose",
    "XRInputSource",
    "XRInputSourceArray",
    "XRLayer",
    "XRWebGLLayer",
    "XRSessionEvent",
    "XRInputSourceEvent",
    "XRInputSourcesChangeEvent",
    "XRReferenceSpaceEvent"
])

// https://webaudio.github.io/web-midi-api/
// copy(Array.from(new Set([...document.querySelectorAll('[data-link-type] code')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "MIDIAccess",
    "MIDIInputMap",
    "MIDIInput",
    "MIDIOutputMap",
    "MIDIOutput",
    "MIDIConnectionEvent",
    "MIDIPort",
    "MIDIMessageEvent",
])

// https://webassembly.github.io/spec/js-api/
// copy(Array.from(new Set([...document.querySelectorAll('.idl-code c-')].map(e => e.innerText).filter(e => Object.getOwnPropertyNames(window).includes(e)))))
names = filterOut(names, [
    "WebAssembly"
])

// https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md
// mojo
names = names.filter(e => !(/^mojo/.exec(e)))
names = names.filter(e => !(/^Mojo/.exec(e)))

// Regex
names = names.filter(e => !(/^\$/.exec(e)))

// Depreciated APIs
names = filterOut(names, [
    "MediaStreamEvent",
    "CSSPositionValue",
    "defaultStatus",
    "defaultstatus",
    "DOMError",
    "TextEvent",
    "captureEvents",
    "releaseEvents",
    "FeaturePolicy"
])

// The rest
// [
//     "UserActivation",
//     "CanvasCaptureMediaStreamTrack",
//     "CSSConditionRule",
//     "BeforeInstallPromptEvent",
//     "external",
//     "clientInformation",
//     "offscreenBuffering",
//     "styleMedia",
//     "crypto",
//     "find",
//     "chrome",
//     "caches",
//     "Gyroscope",
//     "FragmentDirective",
//     "Scheduling",
//     "XSLTProcessor",
//     "PeriodicSyncManager",
//     "VideoPlaybackQuality",
//     "openDatabase",
//     "loadTimeData",
//     "JSCompiler_renameProperty",
//     "ShadyCSS",
//     "skia",
//     "url",
//     "search",
//     "newTabPage",
//     "cr",
//     "promoBrowserCommand",
//     "chromeCart",
//     "drive",
//     "taskModule",
//     "profile",
//     "profileEnd",
//     "keys",
//     "values",
//     "undebug",
//     "monitor",
//     "unmonitor",
//     "inspect",
//     "queryObjects",
//     "getEventListeners",
//     "monitorEvents",
//     "unmonitorEvents",
//     "filterOut"
// ]