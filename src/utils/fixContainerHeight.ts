function fixContainerHeight(listContainer: HTMLElement): void {
  listContainer.style.height = getComputedStyle(listContainer).getPropertyValue('height')
}

export { fixContainerHeight }
