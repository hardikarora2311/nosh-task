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

const Home = async () => {
  const dishes = await db.dishes.findMany({
    orderBy: { dishId: "asc" },
  });
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <h1 className="text-4xl font-bold tracking-tight">Dishes Data</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dish Id</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Dish Name
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Dish Image Url
                </TableHead>
                <TableHead>isPublished?</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dishes.map((dish) => (
                <TableRow key={dish.dishId} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">{dish.dishId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{dish.dishName}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {dish.imageUrl}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
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
      </div>
    </div>
  );
};

export default Home;
