type TrackProperties = {
  explicit: boolean;
  length: string;
  title: string;
};

export function assertTrackInList(
  assert: Assert,
  trackElement: Element,
  trackProperties: TrackProperties,
): void {
  const { explicit, title } = trackProperties;

  assert.dom('[data-test-field="Title"]', trackElement).hasText(title);

  assert
    .dom('[data-test-field="Explicit"]', trackElement)
    .exists({ count: explicit ? 1 : 0 });
}

export function assertTrackInTable(
  assert: Assert,
  trackElement: Element,
  trackProperties: TrackProperties,
): void {
  const { explicit, length, title } = trackProperties;

  assert.dom('[data-test-column="Title"]', trackElement).hasText(title);

  assert.dom('[data-test-column="Length"]', trackElement).hasText(length);

  assert
    .dom('[data-test-column="Explicit"]', trackElement)
    .hasText(explicit ? 'Yes' : '');
}
