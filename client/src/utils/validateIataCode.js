/**
 *  Validates an iata code is a 3 chars and uppercase string
 * @param {String} code
 */
function validateIataCode(code) {
  return code.length === 3 && code === code.toUpperCase();
}

export default validateIataCode;
