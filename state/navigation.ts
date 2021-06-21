export enum ModalInstance {
  LOGIN = 'LOGIN',
}

export interface INavigation {
  openedModal: ModalInstance | null;
}

export const initialNavigationState: INavigation = {
  openedModal: null,
};

export enum NavigationActions {
  SET_MODAL_IS_OPEN = 'SET_MODAL_IS_OPEN',
}

// ////////////////////////////// //
//         Action Creators        //
// ////////////////////////////// //

export const setCurrentOpenModal = (isOpen: boolean) => ({
  type: NavigationActions.SET_MODAL_IS_OPEN,
  payload: isOpen,
});
