
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

        function  checkOrderCompleteDate(str){
            var current_date = new Date()
            var complete_date = str

            // console.log("current_date",current_date.getTime())
            // console.log("complete_date",Date.parse(complete_date))

            //because input date format is 2021-01-26 but Date() function is input another long string format 

            var duration_hours = Date.parse(complete_date) - current_date.getTime() 
            var duration_days = duration_hours / (1000*60*60*24)

            // console.log("duration_days: ",duration_days)
            // console.log("duration_hours: ",duration_hours)

            var result = duration_days > 4
            if (duration_days > 0) {
                if (duration_days > 4) {
                    var msg = ''
                }else{
                    var msg = 'Please be kind to order a cake before 4 days'
                }
            }else{
                var msg = 'Date is not valid'
            }

            return {result, msg}
        }
// module.exports = {}
export {checkImageType, checkContactNum, checkName,checkPassword, checkOrderCompleteDate}