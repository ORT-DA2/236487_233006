export const PAGES = {
// LOGIN: '/login',   <= Example
};
export const REGEX = {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    ALPHANUMERIC: /^[a-zA-Z0-9]*$/,
    NO_WHITESPACE: /^\S*$/
};
export const ASSETS = {
// LOGO_COLOR: 'assets/svg/logo-color.svg',   <= Example
};
export var DialogType;
(function (DialogType) {
    DialogType["User"] = "user";
    DialogType["Delete"] = "delete";
    DialogType["Register"] = "register";
    DialogType["AdminNotification"] = "adminNotification";
})(DialogType || (DialogType = {}));
export const InitialDialogState = {
    [DialogType.Register]: false,
    [DialogType.User]: false,
    [DialogType.Delete]: false,
    [DialogType.AdminNotification]: false,
    // ... other initial dialog states
};
export var RoleType;
(function (RoleType) {
    RoleType[RoleType["Admin"] = 1] = "Admin";
    RoleType[RoleType["Blogger"] = 2] = "Blogger";
})(RoleType || (RoleType = {}));
export var ImagePosition;
(function (ImagePosition) {
    ImagePosition[ImagePosition["Top"] = 0] = "Top";
    ImagePosition[ImagePosition["Left"] = 1] = "Left";
    ImagePosition[ImagePosition["Bottom"] = 2] = "Bottom";
    ImagePosition[ImagePosition["TopAndBottom"] = 3] = "TopAndBottom";
})(ImagePosition || (ImagePosition = {}));
export var FilterFrom;
(function (FilterFrom) {
    FilterFrom["AllArticles"] = "articles";
    FilterFrom["Recent"] = "recent";
})(FilterFrom || (FilterFrom = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbnN0YW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2xpYi91dGlscy9jb25zdGFudHMvZ2xvYmFsLWNvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUc7QUFDcEIsZ0NBQWdDO0NBQ2hDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUc7SUFDbEIsS0FBSyxFQUFHLGtDQUFrQztJQUMxQyxZQUFZLEVBQUUsZ0JBQWdCO0lBQzlCLGFBQWEsRUFBRSxPQUFPO0NBQ3hCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUc7QUFDckIsd0RBQXdEO0NBQ3hELENBQUM7QUFFRixNQUFNLENBQU4sSUFBWSxVQUtYO0FBTEQsV0FBWSxVQUFVO0lBQ3BCLDJCQUFhLENBQUE7SUFDYiwrQkFBaUIsQ0FBQTtJQUNqQixtQ0FBcUIsQ0FBQTtJQUNyQixxREFBdUMsQ0FBQTtBQUN6QyxDQUFDLEVBTFcsVUFBVSxLQUFWLFVBQVUsUUFLckI7QUFNRCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBVztJQUN4QyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLO0lBQzVCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUs7SUFDeEIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSztJQUMxQixDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEtBQUs7SUFDckMsa0NBQWtDO0NBQ25DLENBQUE7QUFHRCxNQUFNLENBQU4sSUFBWSxRQUdYO0FBSEQsV0FBWSxRQUFRO0lBQ2xCLHlDQUFTLENBQUE7SUFDVCw2Q0FBVyxDQUFBO0FBQ2IsQ0FBQyxFQUhXLFFBQVEsS0FBUixRQUFRLFFBR25CO0FBRUQsTUFBTSxDQUFOLElBQVksYUFLWDtBQUxELFdBQVksYUFBYTtJQUN2QiwrQ0FBTyxDQUFBO0lBQ1AsaURBQVEsQ0FBQTtJQUNSLHFEQUFVLENBQUE7SUFDVixpRUFBZ0IsQ0FBQTtBQUNsQixDQUFDLEVBTFcsYUFBYSxLQUFiLGFBQWEsUUFLeEI7QUFFRCxNQUFNLENBQU4sSUFBWSxVQUdYO0FBSEQsV0FBWSxVQUFVO0lBQ3BCLHNDQUF3QixDQUFBO0lBQ3hCLCtCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyxVQUFVLEtBQVYsVUFBVSxRQUdyQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBQQUdFUyA9IHtcclxuXHQvLyBMT0dJTjogJy9sb2dpbicsICAgPD0gRXhhbXBsZVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFJFR0VYID0ge1xyXG4gICBFTUFJTCA6IC9eW1xcdy1cXC5dK0AoW1xcdy1dK1xcLikrW1xcdy1dezIsNH0kLyxcclxuICAgQUxQSEFOVU1FUklDOiAvXlthLXpBLVowLTldKiQvICwvLyBhbHBoYW51bWVyaWM6IG11c3QgY29udGFpbiBvbmx5IGxldHRlcnMgYW5kIG51bWJlcnNcclxuICAgTk9fV0hJVEVTUEFDRTogL15cXFMqJC9cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBBU1NFVFMgPSB7XHJcblx0Ly8gTE9HT19DT0xPUjogJ2Fzc2V0cy9zdmcvbG9nby1jb2xvci5zdmcnLCAgIDw9IEV4YW1wbGVcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIERpYWxvZ1R5cGUge1xyXG4gIFVzZXIgPSAndXNlcicsXHJcbiAgRGVsZXRlID0gJ2RlbGV0ZScsXHJcbiAgUmVnaXN0ZXIgPSAncmVnaXN0ZXInLFxyXG4gIEFkbWluTm90aWZpY2F0aW9uID0gJ2FkbWluTm90aWZpY2F0aW9uJ1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBEaWFsb2cgPSB7XHJcbiAgW2tleSBpbiBEaWFsb2dUeXBlXT86IGJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEluaXRpYWxEaWFsb2dTdGF0ZTogRGlhbG9nID0ge1xyXG4gIFtEaWFsb2dUeXBlLlJlZ2lzdGVyXTogZmFsc2UsXHJcbiAgW0RpYWxvZ1R5cGUuVXNlcl06IGZhbHNlLFxyXG4gIFtEaWFsb2dUeXBlLkRlbGV0ZV06IGZhbHNlLFxyXG4gIFtEaWFsb2dUeXBlLkFkbWluTm90aWZpY2F0aW9uXTogZmFsc2UsXHJcbiAgLy8gLi4uIG90aGVyIGluaXRpYWwgZGlhbG9nIHN0YXRlc1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGVudW0gUm9sZVR5cGUge1xyXG4gIEFkbWluID0gMSxcclxuICBCbG9nZ2VyID0gMlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBJbWFnZVBvc2l0aW9ue1xyXG4gIFRvcCA9IDAsXHJcbiAgTGVmdCA9IDEsXHJcbiAgQm90dG9tID0gMixcclxuICBUb3BBbmRCb3R0b20gPSAzXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZpbHRlckZyb217XHJcbiAgQWxsQXJ0aWNsZXMgPSAnYXJ0aWNsZXMnLFxyXG4gIFJlY2VudCA9ICdyZWNlbnQnXHJcbn1cclxuIl19