import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ItemEditModal from "./ItemEditModal";
import { useState } from "react";

export default function ItemEditButton({ itemId }) {
     const [isOpen, setIsOpen] = useState(false);
  return (
        <>
      <button
        onClick={() => setIsOpen(true)}
        className="m-3 border-2 border-accent rounded-lg p-3 text-2xl"
      >
        Редактировать
      </button>
      {isOpen && (
        <ItemEditModal
          itemId={itemId}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}