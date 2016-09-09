import { StyleSheet } from "aphrodite/no-important"

export const colorModes = {
    dark: { color: [100, 255, 0], backgroundColor: [0, 0, 0] },
    light: { color: [0,0,0], backgroundColor: [255, 255, 255] }
}

export function int ([r, g, b]) {
    return (r << 16) + (g << 8) + b
}

export function rgb ([r,g,b]) {
    return `rgb(${r},${g},${b})`
}

export const rgba = ([r,g,b]) => (a) => {
    return `rgba(${r},${g},${b},${a})`
}

export function selectColors ({ colorMode }) {
    const p = colorModes[colorMode]
    return {
        colorMode,
        color: rgb(p.color),
        backgroundColor: rgb(p.backgroundColor),
        colorAlpha: rgba(p.color),
        backgroundColorAlpha: rgba(p.backgroundColor),
    }
}

function replaceColor (palette, object) {
    const res = {}
    Object.keys(object).forEach((key) => {
        const val = object[key]
        // recur
        if (val && typeof val === "object") {
            res[key] = replaceColor(palette, object[key])
        // function
        } else if (typeof val === "function") {
            res[key] = val(palette)
        // replace
        } else if (palette[val]) {
            res[key] = rgb(palette[val])
        } else {
            res[key] = val
        }
    })
    return res
}

export function makeStyles (styleDef) {
    const res = {}
    Object.keys(colorModes).forEach((p) => {
        res[p] = StyleSheet.create(replaceColor(colorModes[p], styleDef))
    })
    return res
}
