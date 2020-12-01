export const requestCameraPermission = device => ({
    type: "DEVICE_PERMISSION",
    device
})

export const resetPermission = (device = null) => ({
    type: "RESET_PERMISSION",
    device
})

export const requestEndcallPermission = request => ({
    type: "END_CALL_PERMISSION",
    request
})
