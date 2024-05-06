"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-fast-compare";
exports.ids = ["vendor-chunks/react-fast-compare"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-fast-compare/index.js":
/*!**************************************************!*\
  !*** ./node_modules/react-fast-compare/index.js ***!
  \**************************************************/
/***/ ((module) => {

eval("\nvar isArray = Array.isArray;\nvar keyList = Object.keys;\nvar hasProp = Object.prototype.hasOwnProperty;\nvar hasElementType = typeof Element !== \"undefined\";\nfunction equal(a, b) {\n    // fast-deep-equal index.js 2.0.1\n    if (a === b) return true;\n    if (a && b && typeof a == \"object\" && typeof b == \"object\") {\n        var arrA = isArray(a), arrB = isArray(b), i, length, key;\n        if (arrA && arrB) {\n            length = a.length;\n            if (length != b.length) return false;\n            for(i = length; i-- !== 0;)if (!equal(a[i], b[i])) return false;\n            return true;\n        }\n        if (arrA != arrB) return false;\n        var dateA = a instanceof Date, dateB = b instanceof Date;\n        if (dateA != dateB) return false;\n        if (dateA && dateB) return a.getTime() == b.getTime();\n        var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;\n        if (regexpA != regexpB) return false;\n        if (regexpA && regexpB) return a.toString() == b.toString();\n        var keys = keyList(a);\n        length = keys.length;\n        if (length !== keyList(b).length) return false;\n        for(i = length; i-- !== 0;)if (!hasProp.call(b, keys[i])) return false;\n        // end fast-deep-equal\n        // start react-fast-compare\n        // custom handling for DOM elements\n        if (hasElementType && a instanceof Element && b instanceof Element) return a === b;\n        // custom handling for React\n        for(i = length; i-- !== 0;){\n            key = keys[i];\n            if (key === \"_owner\" && a.$$typeof) {\n                continue;\n            } else {\n                // all other properties should be traversed as usual\n                if (!equal(a[key], b[key])) return false;\n            }\n        }\n        // end react-fast-compare\n        // fast-deep-equal index.js 2.0.1\n        return true;\n    }\n    return a !== a && b !== b;\n}\n// end fast-deep-equal\nmodule.exports = function exportedEqual(a, b) {\n    try {\n        return equal(a, b);\n    } catch (error) {\n        if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {\n            // warn on circular references, don't crash\n            // browsers give this different errors name and messages:\n            // chrome/safari: \"RangeError\", \"Maximum call stack size exceeded\"\n            // firefox: \"InternalError\", too much recursion\"\n            // edge: \"Error\", \"Out of stack space\"\n            console.warn(\"Warning: react-fast-compare does not handle circular references.\", error.name, error.message);\n            return false;\n        }\n        // some other error. we should definitely know about these\n        throw error;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtZmFzdC1jb21wYXJlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBRUEsSUFBSUEsVUFBVUMsTUFBTUQsT0FBTztBQUMzQixJQUFJRSxVQUFVQyxPQUFPQyxJQUFJO0FBQ3pCLElBQUlDLFVBQVVGLE9BQU9HLFNBQVMsQ0FBQ0MsY0FBYztBQUM3QyxJQUFJQyxpQkFBaUIsT0FBT0MsWUFBWTtBQUV4QyxTQUFTQyxNQUFNQyxDQUFDLEVBQUVDLENBQUM7SUFDakIsaUNBQWlDO0lBQ2pDLElBQUlELE1BQU1DLEdBQUcsT0FBTztJQUVwQixJQUFJRCxLQUFLQyxLQUFLLE9BQU9ELEtBQUssWUFBWSxPQUFPQyxLQUFLLFVBQVU7UUFDMUQsSUFBSUMsT0FBT2IsUUFBUVcsSUFDZkcsT0FBT2QsUUFBUVksSUFDZkcsR0FDQUMsUUFDQUM7UUFFSixJQUFJSixRQUFRQyxNQUFNO1lBQ2hCRSxTQUFTTCxFQUFFSyxNQUFNO1lBQ2pCLElBQUlBLFVBQVVKLEVBQUVJLE1BQU0sRUFBRSxPQUFPO1lBQy9CLElBQUtELElBQUlDLFFBQVFELFFBQVEsR0FDdkIsSUFBSSxDQUFDTCxNQUFNQyxDQUFDLENBQUNJLEVBQUUsRUFBRUgsQ0FBQyxDQUFDRyxFQUFFLEdBQUcsT0FBTztZQUNqQyxPQUFPO1FBQ1Q7UUFFQSxJQUFJRixRQUFRQyxNQUFNLE9BQU87UUFFekIsSUFBSUksUUFBUVAsYUFBYVEsTUFDckJDLFFBQVFSLGFBQWFPO1FBQ3pCLElBQUlELFNBQVNFLE9BQU8sT0FBTztRQUMzQixJQUFJRixTQUFTRSxPQUFPLE9BQU9ULEVBQUVVLE9BQU8sTUFBTVQsRUFBRVMsT0FBTztRQUVuRCxJQUFJQyxVQUFVWCxhQUFhWSxRQUN2QkMsVUFBVVosYUFBYVc7UUFDM0IsSUFBSUQsV0FBV0UsU0FBUyxPQUFPO1FBQy9CLElBQUlGLFdBQVdFLFNBQVMsT0FBT2IsRUFBRWMsUUFBUSxNQUFNYixFQUFFYSxRQUFRO1FBRXpELElBQUlyQixPQUFPRixRQUFRUztRQUNuQkssU0FBU1osS0FBS1ksTUFBTTtRQUVwQixJQUFJQSxXQUFXZCxRQUFRVSxHQUFHSSxNQUFNLEVBQzlCLE9BQU87UUFFVCxJQUFLRCxJQUFJQyxRQUFRRCxRQUFRLEdBQ3ZCLElBQUksQ0FBQ1YsUUFBUXFCLElBQUksQ0FBQ2QsR0FBR1IsSUFBSSxDQUFDVyxFQUFFLEdBQUcsT0FBTztRQUN4QyxzQkFBc0I7UUFFdEIsMkJBQTJCO1FBQzNCLG1DQUFtQztRQUNuQyxJQUFJUCxrQkFBa0JHLGFBQWFGLFdBQVdHLGFBQWFILFNBQ3pELE9BQU9FLE1BQU1DO1FBRWYsNEJBQTRCO1FBQzVCLElBQUtHLElBQUlDLFFBQVFELFFBQVEsR0FBSTtZQUMzQkUsTUFBTWIsSUFBSSxDQUFDVyxFQUFFO1lBQ2IsSUFBSUUsUUFBUSxZQUFZTixFQUFFZ0IsUUFBUSxFQUFFO2dCQUtsQztZQUNGLE9BQU87Z0JBQ0wsb0RBQW9EO2dCQUNwRCxJQUFJLENBQUNqQixNQUFNQyxDQUFDLENBQUNNLElBQUksRUFBRUwsQ0FBQyxDQUFDSyxJQUFJLEdBQUcsT0FBTztZQUNyQztRQUNGO1FBQ0EseUJBQXlCO1FBRXpCLGlDQUFpQztRQUNqQyxPQUFPO0lBQ1Q7SUFFQSxPQUFPTixNQUFNQSxLQUFLQyxNQUFNQTtBQUMxQjtBQUNBLHNCQUFzQjtBQUV0QmdCLE9BQU9DLE9BQU8sR0FBRyxTQUFTQyxjQUFjbkIsQ0FBQyxFQUFFQyxDQUFDO0lBQzFDLElBQUk7UUFDRixPQUFPRixNQUFNQyxHQUFHQztJQUNsQixFQUFFLE9BQU9tQixPQUFPO1FBQ2QsSUFBSSxNQUFPQyxPQUFPLElBQUlELE1BQU1DLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLHVCQUF5QkYsTUFBTUcsTUFBTSxLQUFLLENBQUMsWUFBYTtZQUNoRywyQ0FBMkM7WUFDM0MseURBQXlEO1lBQ3pELGtFQUFrRTtZQUNsRSxnREFBZ0Q7WUFDaEQsc0NBQXNDO1lBQ3RDQyxRQUFRQyxJQUFJLENBQUMsb0VBQW9FTCxNQUFNTSxJQUFJLEVBQUVOLE1BQU1DLE9BQU87WUFDMUcsT0FBTztRQUNUO1FBQ0EsMERBQTBEO1FBQzFELE1BQU1EO0lBQ1I7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3B1bHNhci1uZXh0Ly4vbm9kZV9tb2R1bGVzL3JlYWN0LWZhc3QtY29tcGFyZS9pbmRleC5qcz80ZjQ5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGtleUxpc3QgPSBPYmplY3Qua2V5cztcbnZhciBoYXNQcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBoYXNFbGVtZW50VHlwZSA9IHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJztcblxuZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICAvLyBmYXN0LWRlZXAtZXF1YWwgaW5kZXguanMgMi4wLjFcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYXJyQSA9IGlzQXJyYXkoYSlcbiAgICAgICwgYXJyQiA9IGlzQXJyYXkoYilcbiAgICAgICwgaVxuICAgICAgLCBsZW5ndGhcbiAgICAgICwga2V5O1xuXG4gICAgaWYgKGFyckEgJiYgYXJyQikge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhcnJBICE9IGFyckIpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBkYXRlQSA9IGEgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAsIGRhdGVCID0gYiBpbnN0YW5jZW9mIERhdGU7XG4gICAgaWYgKGRhdGVBICE9IGRhdGVCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVBICYmIGRhdGVCKSByZXR1cm4gYS5nZXRUaW1lKCkgPT0gYi5nZXRUaW1lKCk7XG5cbiAgICB2YXIgcmVnZXhwQSA9IGEgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICwgcmVnZXhwQiA9IGIgaW5zdGFuY2VvZiBSZWdFeHA7XG4gICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyZWdleHBBICYmIHJlZ2V4cEIpIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuXG4gICAgdmFyIGtleXMgPSBrZXlMaXN0KGEpO1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCAhPT0ga2V5TGlzdChiKS5sZW5ndGgpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIWhhc1Byb3AuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGVuZCBmYXN0LWRlZXAtZXF1YWxcblxuICAgIC8vIHN0YXJ0IHJlYWN0LWZhc3QtY29tcGFyZVxuICAgIC8vIGN1c3RvbSBoYW5kbGluZyBmb3IgRE9NIGVsZW1lbnRzXG4gICAgaWYgKGhhc0VsZW1lbnRUeXBlICYmIGEgaW5zdGFuY2VvZiBFbGVtZW50ICYmIGIgaW5zdGFuY2VvZiBFbGVtZW50KVxuICAgICAgcmV0dXJuIGEgPT09IGI7XG5cbiAgICAvLyBjdXN0b20gaGFuZGxpbmcgZm9yIFJlYWN0XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGtleSA9PT0gJ19vd25lcicgJiYgYS4kJHR5cGVvZikge1xuICAgICAgICAvLyBSZWFjdC1zcGVjaWZpYzogYXZvaWQgdHJhdmVyc2luZyBSZWFjdCBlbGVtZW50cycgX293bmVyLlxuICAgICAgICAvLyAgX293bmVyIGNvbnRhaW5zIGNpcmN1bGFyIHJlZmVyZW5jZXNcbiAgICAgICAgLy8gYW5kIGlzIG5vdCBuZWVkZWQgd2hlbiBjb21wYXJpbmcgdGhlIGFjdHVhbCBlbGVtZW50cyAoYW5kIG5vdCB0aGVpciBvd25lcnMpXG4gICAgICAgIC8vIC4kJHR5cGVvZiBhbmQgLl9zdG9yZSBvbiBqdXN0IHJlYXNvbmFibGUgbWFya2VycyBvZiBhIHJlYWN0IGVsZW1lbnRcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbGwgb3RoZXIgcHJvcGVydGllcyBzaG91bGQgYmUgdHJhdmVyc2VkIGFzIHVzdWFsXG4gICAgICAgIGlmICghZXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGVuZCByZWFjdC1mYXN0LWNvbXBhcmVcblxuICAgIC8vIGZhc3QtZGVlcC1lcXVhbCBpbmRleC5qcyAyLjAuMVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGEgIT09IGEgJiYgYiAhPT0gYjtcbn1cbi8vIGVuZCBmYXN0LWRlZXAtZXF1YWxcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHBvcnRlZEVxdWFsKGEsIGIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZXF1YWwoYSwgYik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKChlcnJvci5tZXNzYWdlICYmIGVycm9yLm1lc3NhZ2UubWF0Y2goL3N0YWNrfHJlY3Vyc2lvbi9pKSkgfHwgKGVycm9yLm51bWJlciA9PT0gLTIxNDY4MjgyNjApKSB7XG4gICAgICAvLyB3YXJuIG9uIGNpcmN1bGFyIHJlZmVyZW5jZXMsIGRvbid0IGNyYXNoXG4gICAgICAvLyBicm93c2VycyBnaXZlIHRoaXMgZGlmZmVyZW50IGVycm9ycyBuYW1lIGFuZCBtZXNzYWdlczpcbiAgICAgIC8vIGNocm9tZS9zYWZhcmk6IFwiUmFuZ2VFcnJvclwiLCBcIk1heGltdW0gY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCJcbiAgICAgIC8vIGZpcmVmb3g6IFwiSW50ZXJuYWxFcnJvclwiLCB0b28gbXVjaCByZWN1cnNpb25cIlxuICAgICAgLy8gZWRnZTogXCJFcnJvclwiLCBcIk91dCBvZiBzdGFjayBzcGFjZVwiXG4gICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IHJlYWN0LWZhc3QtY29tcGFyZSBkb2VzIG5vdCBoYW5kbGUgY2lyY3VsYXIgcmVmZXJlbmNlcy4nLCBlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gc29tZSBvdGhlciBlcnJvci4gd2Ugc2hvdWxkIGRlZmluaXRlbHkga25vdyBhYm91dCB0aGVzZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuIl0sIm5hbWVzIjpbImlzQXJyYXkiLCJBcnJheSIsImtleUxpc3QiLCJPYmplY3QiLCJrZXlzIiwiaGFzUHJvcCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiaGFzRWxlbWVudFR5cGUiLCJFbGVtZW50IiwiZXF1YWwiLCJhIiwiYiIsImFyckEiLCJhcnJCIiwiaSIsImxlbmd0aCIsImtleSIsImRhdGVBIiwiRGF0ZSIsImRhdGVCIiwiZ2V0VGltZSIsInJlZ2V4cEEiLCJSZWdFeHAiLCJyZWdleHBCIiwidG9TdHJpbmciLCJjYWxsIiwiJCR0eXBlb2YiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXhwb3J0ZWRFcXVhbCIsImVycm9yIiwibWVzc2FnZSIsIm1hdGNoIiwibnVtYmVyIiwiY29uc29sZSIsIndhcm4iLCJuYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-fast-compare/index.js\n");

/***/ })

};
;