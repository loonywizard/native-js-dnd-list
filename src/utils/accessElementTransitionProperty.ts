/*
 * The browser doesn't update transition property, changed by adding and then removing class,
 * because both changes are happening in a single javascript round, so browser takes its chance
 * to optimize the process and doesn't update transition property
 *
 * The solution is to try to access property value, it triggers browser to update
 * property we're trying to access
 *
 * See stackoverflow answer: https://stackoverflow.com/a/24195559
 */
function accessElementTransitionProperty(element: HTMLElement): void {
  window.getComputedStyle(element).getPropertyValue('transition')
}

export { accessElementTransitionProperty }
