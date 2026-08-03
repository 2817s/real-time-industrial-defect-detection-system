from pathlib import Path
import shutil
import xml.etree.ElementTree as ET

PROJECT_ROOT = Path(__file__).resolve().parent.parent

SOURCE_DATASET = PROJECT_ROOT / "dataset" / "NEU-DET"

OUTPUT_DATASET = PROJECT_ROOT / "dataset" / "NEU-DET-YOLO"

TRAIN_IMAGES = SOURCE_DATASET / "train" / "images"
TRAIN_XML = SOURCE_DATASET / "train" / "annotations"

VALID_IMAGES = SOURCE_DATASET / "validation" / "images"
VALID_XML = SOURCE_DATASET / "validation" / "annotations"

YOLO_TRAIN_IMAGES = OUTPUT_DATASET / "train" / "images"
YOLO_TRAIN_LABELS = OUTPUT_DATASET / "train" / "labels"

YOLO_VALID_IMAGES = OUTPUT_DATASET / "valid" / "images"
YOLO_VALID_LABELS = OUTPUT_DATASET / "valid" / "labels"

CLASS_MAP = {
    "crazing": 0,
    "inclusion": 1,
    "patches": 2,
    "pitted_surface": 3,
    "rolled-in_scale": 4,
    "scratches": 5
}

def create_output_folders():

    if OUTPUT_DATASET.exists():
        shutil.rmtree(OUTPUT_DATASET)

    YOLO_TRAIN_IMAGES.mkdir(parents=True)
    YOLO_TRAIN_LABELS.mkdir(parents=True)

    YOLO_VALID_IMAGES.mkdir(parents=True)
    YOLO_VALID_LABELS.mkdir(parents=True)

    print("YOLO output folders created.")

def convert_bbox(size, box):
    """
    Convert Pascal VOC bounding box to YOLO format.
    """

    image_width, image_height = size

    xmin, ymin, xmax, ymax = box

    x_center = ((xmin + xmax) / 2) / image_width
    y_center = ((ymin + ymax) / 2) / image_height

    width = (xmax - xmin) / image_width
    height = (ymax - ymin) / image_height

    return (
        round(x_center, 6),
        round(y_center, 6),
        round(width, 6),
        round(height, 6),
    )

def convert_annotation(xml_file, output_label):
    """
    Convert one XML annotation into YOLO label format.
    """

    tree = ET.parse(xml_file)
    root = tree.getroot()

    image_width = int(root.find("size/width").text)
    image_height = int(root.find("size/height").text)

    with open(output_label, "w") as label_file:

        for obj in root.findall("object"):

            class_name = obj.find("name").text.strip()

            if class_name not in CLASS_MAP:
                continue

            class_id = CLASS_MAP[class_name]

            bbox = obj.find("bndbox")

            xmin = float(bbox.find("xmin").text)
            ymin = float(bbox.find("ymin").text)
            xmax = float(bbox.find("xmax").text)
            ymax = float(bbox.find("ymax").text)

            x, y, w, h = convert_bbox(
                (image_width, image_height),
                (xmin, ymin, xmax, ymax),
            )

            label_file.write(
                f"{class_id} {x} {y} {w} {h}\n"
            )

def process_dataset(image_dir, xml_dir, output_image_dir, output_label_dir):
    """
    Convert all XML annotations in a dataset split.
    """

    converted = 0
    skipped = 0

    for xml_file in xml_dir.glob("*.xml"):

        # Read class name from XML
        tree = ET.parse(xml_file)
        root = tree.getroot()

        class_name = root.find("object/name").text.strip()

        # Image is stored inside its class folder
        image_file = image_dir / class_name / (xml_file.stem + ".jpg")

        if not image_file.exists():
            skipped += 1
            print(f"Skipping {xml_file.stem} (image not found)")
            continue

        output_label = output_label_dir / (xml_file.stem + ".txt")
        output_image = output_image_dir / image_file.name

        # Convert XML annotation to YOLO format
        convert_annotation(xml_file, output_label)

        # Copy image into YOLO dataset
        shutil.copy2(image_file, output_image)

        converted += 1

    print(f"\nProcessed {converted} files")
    print(f"Skipped {skipped} files")

    
def main():

    print("Starting XML → YOLO conversion...\n")

    create_output_folders()

    print("\nProcessing Training Dataset...")

    process_dataset(
        TRAIN_IMAGES,
        TRAIN_XML,
        YOLO_TRAIN_IMAGES,
        YOLO_TRAIN_LABELS,
    )

    print("\nProcessing Validation Dataset...")

    process_dataset(
        VALID_IMAGES,
        VALID_XML,
        YOLO_VALID_IMAGES,
        YOLO_VALID_LABELS,
    )

    print("\n===================================")
    print("XML → YOLO conversion completed.")
    print("===================================")


if __name__ == "__main__":
    main()