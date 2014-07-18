using System.Text;
using System.Web.Http;
using webGold.Business.Model;
using webGold.Services;
using WRIO.Extensions;

namespace WRIO.api
{
    public class PayPalWithdrawController : CustomApiController
    {
        // POST api/paypalwithdraw
        public WithdrawModel Post([FromBody]WithdrawModel model)
        {
            if (Profile.UserService.IsEmailExist(model.Email))
            {
                var userByEmail = Profile.UserService.GetUserByIdentity(model.Email);
                var currentUserId = Profile.CurrentUser.Id;
                model.AddUserId(currentUserId, userByEmail.Id);
                model = PayPalService.Withdraw(model);
                var emailText = new StringBuilder();
                emailText.AppendFormat("User ID : {0} </br>", currentUserId);
                emailText.AppendFormat("E-mail : {0} </br>", model.Email);
                emailText.AppendFormat("Amount USD : {0} </br>", model.USDAmount);
                emailText.AppendFormat("Amount WRG: {0} </br>", model.WRGAmount);
                var emailWorker = new EmailWorker();
                emailWorker.SendEmail(model.Email, "PayPal Withdraw", emailText.ToString());
            }
            else
            {
                model.ErrorType = ErrorType.incorrectEmail.ToString();
            }
            return model;
        }
    }
}
