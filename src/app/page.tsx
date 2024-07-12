import StatusDropdown from "@/components/StatusDropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  const dishes = await db.dishes
    .findMany({
      orderBy: { dishId: "asc" },
    })
    .catch((e) => {
      console.error(e);
    });

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <h1 className="text-4xl font-bold tracking-tight mt-9 mx-auto">
            Dishes Data
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dish Id</TableHead>
                <TableHead>Dish Name</TableHead>
                <TableHead>Dish Image Url</TableHead>
                <TableHead>isPublished?</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dishes!.map((dish) => (
                <TableRow key={dish.dishId} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">{dish.dishId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{dish.dishName}</div>
                  </TableCell>
                  <TableCell>
                    <Link href={dish.imageUrl} target="_blank">
                      {dish.imageUrl}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <StatusDropdown
                      id={dish.dishId}
                      currentStatus={dish.isPublished}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Link
          href="https://github.com/hardikarora2311/nosh-task"
          target="_blank"
          className="font-light tracking-tight mt-10 mx-auto text-primary"
        >
          Github for this project{" "}
          <SquareArrowOutUpRight className="size-4 inline ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
