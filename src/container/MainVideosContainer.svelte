<script lang="ts">
  import { graphqlApi } from '../lib/_api';

  import { gotoContents } from '$lib/utils/goto';

  import PreviewVideos from '$component/PreviewVideos.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import MainVideoSkeleton from '$component/skeleton/container/MainVideoSkeleton.svelte';

  import type { IContent } from 'src/global/types';

  let contents: IContent[] = [];
  let end = false;
  let cursor = '';

  async function loadContents(num: number, inputedCursor?: string): Promise<any> {
    const query = `{
          getMainInfiniteContents(
              limit: ${num},
              ${inputedCursor ? `cursor: "${inputedCursor}"` : ''}
          ) {
              totalCount,
              contents {
                    id
                    title
                    programId
                    program {
                        id
                        title
                        thumbnail
                    }
                    createDt
                    episode
                    videoId
                    thumb
                    views
              }
              pageInfo {
                  hasNextPage
                  startCursor
              }
          }
      }`;

    try {
      const { data: { getMainInfiniteContents } } = await graphqlApi(query);
      const newContents = getMainInfiniteContents.contents;

      contents = [...contents, ...newContents];
      end = !getMainInfiniteContents.pageInfo.hasNextPage;
      cursor = getMainInfiniteContents.pageInfo.startCursor;
    } catch (error) {
      console.log(error);
    }
  }

  async function runInfiniteScrolling(event) {
    const detail = event.detail;
    await loadContents(6, cursor);
    detail.stop();
  }
</script>

{#await loadContents(2)}
  <MainVideoSkeleton />
{:then}
  <Container margin="5.6rem 0 0 0">
    <PreviewVideos
            {contents}
            {end}
            {cursor}
            infiniteScroll={true}
            autoPlay={true}
            onClick={gotoContents}
            on:request-more={runInfiniteScrolling}
    />
  </Container>
{/await}

