export default function toRGBA(rgb: string, alpha: number) {
    return rgb.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
}