import type { Table } from "@tanstack/react-table";

import { TableCell, TableRow } from "@/components/ui/table";

import { IconFolderCode } from "@tabler/icons-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

type ReactTableBodyProps<T> = {
  table: Table<T>;
};

export default function ReactTableRowEmpty<T>(props: ReactTableBodyProps<T>) {
  const { table } = props;

  return (
    <TableRow>
      <TableCell className="text-center" colSpan={table.getAllColumns().length}>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconFolderCode />
            </EmptyMedia>
            <EmptyTitle>No Data Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any data yet. Get started by adding your
              first data.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  );
}
