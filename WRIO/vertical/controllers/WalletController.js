//WithdrawCtrl
aps.controller('WalletCtrl', ['$scope', '$rootScope', '$state', 'profileSrv', 'walletSvc',
    function ($scope, $rootScope, $state, profileSrv, walletSvc) {
    $scope.isMsg = [];
    $scope.isMsg['done'] = false;
    $scope.isMsg['error'] = false;
    $scope.profile = {};
    $scope.transactionHistory = [];
    $scope.withdrawModel = {
        WRG: 0,
        USD:0
    };
    $rootScope.balanceModel = {};
        $scope.lastTransaction = {
            GsStr: 0,
            UsdStr: 0
        };

        var payPalResponseInit = function () {
            switch ($state.params.msgType) {
                case 'error':
                    $scope.isMsg['error'] = true;
                    break;
                case 'succes':
                    walletSvc.lastTransaction(function (model) {
                        $scope.lastTransaction = model;
                        $scope.isMsg['done'] = true;
                    });
                    break;
                case 'cancel':
                    $scope.isMsg['error'] = true;
                    break;
                default:
                    break;
            }
        };

        var transactionsInit = function () {
            walletSvc.paymentHistory(function (modelCollection) {
                $scope.transactionHistory = modelCollection;
            });
        };

        var init = function () {
            switch ($state.current.name) {
                case 'payPalResponse':
                    payPalResponseInit();
                    break;
                case 'transactions':
                    transactionsInit();
                    break;
            }
        profileSrv.getProfile(function (model) {
            $scope.profile = model;
        });
        walletSvc.getBalance(function (value) {
            $scope.balanceModel = value;
        });
        };

        init();

       

    $scope.withdraw = function () {
        $scope.isMsg['done'] = false;
        $scope.isMsg['error'] = false;
        walletSvc.withdraw({ USD: $scope.withdrawModel.USD, Email: $scope.profile.Email }, function (model) {
            //todo:
            if (model.IsTransferCanseled) {
                alert('Error type:' + model.ErrorType + " ;Error message:" + model.ErrorMessage);
            } else {
                walletSvc.getBalance(function (value) {
                    $scope.balanceModel = value;
                    $scope.isMsg['done'] = true;
                    $scope.withdrawModel.WRGAmount = model.WRGAmount;
                });
            }
        });
    };
    $scope.closeAlertMsg = function() {
        $scope.isMsg['alertMsg'] = false;
    };
    $scope.changeUSD = function () {
        $scope.withdrawModel.USD = 0;
        var cur = $scope.balanceModel.Currency;
        var WRG = parseFloat($scope.withdrawModel.WRG);
        $scope.withdrawModel.USD = parseFloat((WRG * cur / 10000).toFixed(2));
    };
    $scope.changeWRG = function () {
        $scope.withdrawModel.WRG = 0;
        var cur = $scope.balanceModel.Currency;
        var USD = parseFloat($scope.withdrawModel.USD);
        $scope.withdrawModel.WRG = parseInt((USD * 10000 / cur).toFixed(0));
    };
    $scope.addFunds = function () {
        $scope.isMsg['done'] = false;
        $scope.isMsg['error'] = false;
        //{ Amount: $scope.withdrawModel.Usd}
        walletSvc.addFunds({ Amount: $scope.withdrawModel.USD }, function (model) {
            if (model.IsSucces) {
                window.location = model.Url;
            }else {
                $scope.isMsg['error'] = true;
            }
        });
    };
}]);