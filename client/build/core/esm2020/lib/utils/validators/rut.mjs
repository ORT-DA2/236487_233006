function rutValidationDigit(rut) {
    let count = 0;
    const data = '43298765432';
    data.split('').forEach((dig, i) => {
        count += parseInt(dig) * parseInt(rut[i]);
    });
    const result = count % 11;
    if (result === 0)
        return 0;
    else
        return (11 - result);
}
export function ValidateRUT(control) {
    const rut = control.value || '';
    const value = rut;
    // if (rut === '') return { required: true };
    if (rut === '')
        return null;
    const dig = value[value.length - 1];
    if (value === '' || value.length !== 12 || dig != rutValidationDigit(value))
        return { invalid: true };
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvbGliL3V0aWxzL3ZhbGlkYXRvcnMvcnV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFNBQVMsa0JBQWtCLENBQUMsR0FBVztJQUNyQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxNQUFNLElBQUksR0FBRyxhQUFhLENBQUM7SUFFM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLE1BQU0sR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRTFCLElBQUksTUFBTSxLQUFLLENBQUM7UUFBRSxPQUFPLENBQUMsQ0FBQzs7UUFDdEIsT0FBTyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxPQUFvQjtJQUM5QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUM7SUFFbEIsNkNBQTZDO0lBQzdDLElBQUksR0FBRyxLQUFLLEVBQUU7UUFBRSxPQUFPLElBQUksQ0FBQztJQUU1QixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQyxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksR0FBRyxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQztRQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUE7SUFFckcsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5mdW5jdGlvbiBydXRWYWxpZGF0aW9uRGlnaXQocnV0OiBzdHJpbmcpOiBudW1iZXIge1xyXG4gIGxldCBjb3VudCA9IDA7XHJcbiAgY29uc3QgZGF0YSA9ICc0MzI5ODc2NTQzMic7XHJcblxyXG4gIGRhdGEuc3BsaXQoJycpLmZvckVhY2goKGRpZywgaSkgPT4ge1xyXG4gICAgY291bnQgKz0gcGFyc2VJbnQoZGlnKSAqIHBhcnNlSW50KHJ1dFtpXSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGNvdW50ICUgMTE7XHJcblxyXG4gIGlmIChyZXN1bHQgPT09IDApIHJldHVybiAwO1xyXG4gIGVsc2UgcmV0dXJuICgxMSAtIHJlc3VsdCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWYWxpZGF0ZVJVVChjb250cm9sOiBGb3JtQ29udHJvbCkge1xyXG4gIGNvbnN0IHJ1dCA9IGNvbnRyb2wudmFsdWUgfHwgJyc7XHJcbiAgY29uc3QgdmFsdWUgPSBydXQ7XHJcblxyXG4gIC8vIGlmIChydXQgPT09ICcnKSByZXR1cm4geyByZXF1aXJlZDogdHJ1ZSB9O1xyXG4gIGlmIChydXQgPT09ICcnKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGlnID0gdmFsdWVbdmFsdWUubGVuZ3RoIC0gMV07XHJcbiAgaWYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZS5sZW5ndGggIT09IDEyIHx8IGRpZyAhPSBydXRWYWxpZGF0aW9uRGlnaXQodmFsdWUpKSByZXR1cm4geyBpbnZhbGlkOiB0cnVlIH1cclxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuIl19