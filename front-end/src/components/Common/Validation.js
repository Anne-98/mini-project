
// const Validation = () => {

    const checkPassword = (str) => {

                let testPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                if (testPassword.test(str)) {
                    var msg = ''
                }else{
                    var msg = '* Invalid Password'
                }
                
        return {result: testPassword.test(str), msg};
    }
        function checkName(str){

            let testName = /^([a-zA-Z ]){2,30}$/;

                if (testName.test(str)) {
                    var msg = ''
                }else{
                    var msg = '* Invalid Name'
                }
                return {result: testName.test(str), msg};
            }
        function checkImageType(str){

            var imageType = str.substring(str.length - 4);
            var imageValidation = imageType == '.jpg' || imageType == '.png' || imageType == 'jpeg';

            if (imageValidation) {
                    var msg = ''
                }else{
                    var msg = '* Image file should be jpg / png / jpeg format'
                }
                return {result: imageValidation,msg};
            }
        function checkContactNum(str){

            var res = (str.length == 10 && str.charAt(0) == 0)

            if (res) {
                    var msg = ''
                }else{
                    var msg = '* Invalid telephone number'
                }
                return {result: res, msg};
            }

// module.exports = {}
export {checkImageType, checkContactNum, checkName,checkPassword}