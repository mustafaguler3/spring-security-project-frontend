import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { AlertService } from '../service/alert.service';
import { AlertType } from '../enum/alert-type';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService)
  const alertService = inject(AlertService)
  const router = inject(Router)

  if (accountService.isLoggedIn()) {
    return true;
  }

  accountService.redirectUrl = state.url;
  router.navigate(['/login']);
  alertService.showAlert('You must be logged in to access this page', AlertType.DANGER);

  return false;
};

